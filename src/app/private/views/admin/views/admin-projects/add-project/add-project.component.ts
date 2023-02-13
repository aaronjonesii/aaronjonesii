import { Component } from '@angular/core';
import { initialProjectForm } from "../../../../../../shared/forms/project-form";
import {
  ProjectStatuses,
  ProjectVisibilities,
  WriteProject
} from "../../../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../../../../core/services/console-logger.service";
import { TagsService } from "../../../../../../shared/services/tags.service";
import { catchError, Observable, throwError } from "rxjs";
import { Tag } from "../../../../../../shared/interfaces/tag";
import { tap } from "rxjs/operators";
import { SlugifyPipe } from "../../../../../../shared/pipes/slugify.pipe";
import { Router } from "@angular/router";
import { nav_path } from "../../../../../../app-routing.module";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'aj-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  public readonly title = 'Add Project';
  public loading = false;
  public readonly addForm = initialProjectForm;
  public readonly projectStatuses = ProjectStatuses;
  public readonly projectVisibilities = ProjectVisibilities;
  public allTags$: Observable<Tag[]>;
  private allTags: Tag[] = [];
  public editorConfig = {
    placeholder: 'Write content here...',
    wordCount: {
      onUpdate: (stats:{characters: number, words: number}) => {
        const storyCharacterCount = stats.characters;
        const storyWordCount = stats.words;
      }
    }
  };

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    private tagsService: TagsService,
    private slugify: SlugifyPipe,
    private router: Router
  ) {
    this.allTags$ = (db.col$(`tags`) as Observable<Tag[]>)
      .pipe(
        tap(tags => this.allTags = tags),
        catchError(error => {
          this.cLog.error(`Something went wrong loading tags`, error);
          return throwError(error);
        })
      );
  }
  public get image() { return this.addForm.controls.image; }
  public get name() { return this.addForm.controls.name; }
  public get description() { return this.addForm.controls.description; }
  public get slug() { return this.addForm.controls.slug; }
  public get tags() { return this.addForm.controls.tags; }
  public get livePreviewLink() { return this.addForm.controls.livePreviewLink; }
  public get sourceCodeLink() { return this.addForm.controls.sourceCodeLink; }
  public get content() { return this.addForm.controls.content; }
  public get featured() { return this.addForm.controls.featured; }
  public get allowComments() { return this.addForm.controls.allowComments; }
  public get status() { return this.addForm.controls.status; }
  public get visibility() { return this.addForm.controls.visibility; }

  public onProjectContentChange({editor}: ChangeEvent) {
    if (editor) this.content?.setValue(editor.getData());
  }

  public setSlug(event: any): void {
    this.slug?.setValue(this.slugify.transform(event.target.value));
  }

  private resetForm() {
    this.addForm.reset();
    this.tags.reset([]);
  }

  public async save() {
    this.loading = true;

    this.addForm.disable();

    if (await this.db.docExists(`projects/${this.slug.value}`)) {
      this.cLog.error(`Project with this name already exists, try changing the name or slug`);
      this.loading = false;
      return;
    }

    const project: WriteProject = {
      name: this.name.value,
      description: this.description.value,
      slug: this.slug.value,
      content: this.content.value,
      image: this.image.value,
      tags: this.tags.value.length ? this.tags.value : null,
      livePreviewLink: this.livePreviewLink.value,
      sourceCodeLink: this.sourceCodeLink.value,
      status: this.status.value,
      visibility: this.visibility.value,
      featured: this.featured.value,
      allowComments: this.allowComments.value,
      created: this.db.timestamp,
      updated: null
    };

    await this.db.batch(async batch => {
      /** tags */
      if (project.tags?.length) {
        for (let i = 0; i < project.tags.length; i++) {
          const projectTag = project.tags[i];
          if (this.allTags.some(tag => tag.slug == projectTag)) {
            const tagUpdates: Partial<Tag> = { projects: arrayRemove(projectTag), updated: this.db.timestamp };
            batch.update(this.db.doc(`tags/${projectTag}`), tagUpdates);
          } else {
            const newTag: Tag = {
              slug: projectTag,
              projects: arrayUnion(project.slug),
              created: this.db.timestamp,
              featured: false
            };
            batch.set(this.db.doc(`tags/${projectTag}`), newTag);
          }
        }
      }

      const projectRef = this.db.doc(`projects/${project.slug}`);
      await batch.set(projectRef, project);
    })
      .then(() => this.resetForm())
      .then(() => this.cLog.log(`Project created`))
      .then(() => this.router.navigate([nav_path.adminProjects]))
      .catch(error => {
        this.cLog.error(`Something went wrong creating project`, [error, project]);
        this.addForm.enable();
      })
      .finally(() => {
        this.addForm.enable();
        this.loading = false;
      });
  }
}
