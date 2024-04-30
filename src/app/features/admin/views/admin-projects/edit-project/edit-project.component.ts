import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";
import { catchError, Observable, of, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProjectImageComponent } from "../project-image/project-image.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ProjectTagsComponent } from "../project-tags/project-tags.component";
import { MatSelectModule } from "@angular/material/select";
import { KeyValuePipe, TitleCasePipe } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AdminEditorComponent } from "../../../shared/admin-editor/admin-editor.component";
import { TopAppBarComponent } from "../../../../../shared/components/top-app-bar/top-app-bar.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { SlugifyPipe } from "../../../../../shared/pipes/slugify.pipe";
import { ProjectStatus, ProjectVisibility, ReadProject, WriteProject } from "../../../../../shared/interfaces/project";
import { initialProjectForm, ProjectForm } from "../../../../../shared/forms/project-form";
import { Tag } from "../../../../../shared/interfaces/tag";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { TagsService } from "../../../../../shared/services/tags.service";
import { nav_path } from "../../../../../app.routes";
import { ConsoleLoggerService } from "../../../../../shared/services/console-logger.service";

@Component({
  selector: 'aj-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
  standalone: true,
  imports: [
    TopAppBarComponent,
    MatButtonModule,
    MatIconModule,
    LoadingComponent,
    ReactiveFormsModule,
    ProjectImageComponent,
    MatFormFieldModule,
    MatInputModule,
    ProjectTagsComponent,
    MatSelectModule,
    KeyValuePipe,
    TitleCasePipe,
    MatCheckboxModule,
    AdminEditorComponent,
  ],
  providers: [SlugifyPipe],
})
export class EditProjectComponent implements OnInit {
  readonly title = 'Edit project';
  private readonly projectID: string | null = null;
  private project?: ReadProject;
  private projectSnapshot?: ReadProject;
  editForm = initialProjectForm;
  readonly projectStatuses = ProjectStatus;
  readonly projectVisibilities = ProjectVisibility;
  loading = true;
  allTags$: Observable<Tag[]> = of([]);
  private allTags: Tag[] = [];
  editorConfig = {
    placeholder: 'Write content here...',
    wordCount: {
      onUpdate: (stats:{characters: number, words: number}) => {
        const storyCharacterCount = stats.characters;
        const storyWordCount = stats.words;
        /** todo: use these values */
        this.logger.log(`content character count`, storyCharacterCount);
        this.logger.log(`content word count`, storyWordCount);
      }
    }
  };

  constructor(
    private router: Router,
    private slugify: SlugifyPipe,
    private db: FirestoreService,
    private route: ActivatedRoute,
    private tagsService: TagsService,
  private logger: ConsoleLoggerService,
  ) {
    this.projectID = this.route.snapshot.paramMap.get('projectID');
  }
  ngOnInit() {
    this.db.docSnap(`projects/${this.projectID}`)
      .then((docSnapshot) => {
        if (!docSnapshot.exists()) {
          this.router.navigate([nav_path.adminProjects]);
          this.logger.error(`Something went wrong loading project`, this.projectID);
        } else {
          this.allTags$ = (this.db.col$(`tags`) as Observable<Tag[]>)
            .pipe(
              tap(tags => this.allTags = tags),
              catchError(error => {
                this.logger.error(`Something went wrong loading tags`, error);
                return throwError(error);
              })
            );
          const project = docSnapshot.data() as ReadProject;
          this.projectSnapshot = project;
          this.project = project;
          this.setForm(this.project);
          this.loading = false;
        }
      }).catch((error: unknown) => {
        this.logger.error('Something went wrong loading project to edit.', error);
      });
  }
  get image() { return this.editForm.controls.image; }
  get name() { return this.editForm.controls.name; }
  get description() { return this.editForm.controls.description; }
  get slug() { return this.editForm.controls.slug; }
  get tags() { return this.editForm.controls.tags; }
  get livePreviewLink() { return this.editForm.controls.livePreviewLink; }
  get sourceCodeLink() { return this.editForm.controls.sourceCodeLink; }
  get content() { return this.editForm.controls.content; }
  get featured() { return this.editForm.controls.featured; }
  get allowComments() { return this.editForm.controls.allowComments; }
  get status() { return this.editForm.controls.status; }
  get visibility() { return this.editForm.controls.visibility; }

  private setForm(project: ReadProject) {
    this.editForm = new FormGroup<ProjectForm>({
      name: new FormControl<string>(project.name, { nonNullable: true, validators: Validators.required }),
      description: new FormControl<string>(project.description, { nonNullable: true, validators: Validators.required }),
      slug: new FormControl<string>(project.slug, { nonNullable: true, validators: Validators.required }),
      content: new FormControl<string | null>(project.content),
      image: new FormControl<string | null>(project.image),
      tags: new FormArray<FormControl<string>>(project.tags?.length ? project.tags?.map(tag => new FormControl<string>(tag, {nonNullable: true})) : []),
      livePreviewLink: new FormControl<string | null>(project.livePreviewLink),
      sourceCodeLink: new FormControl<string | null>(project.sourceCodeLink),
      status: new FormControl<ProjectStatus>(project.status, { nonNullable: true, validators: Validators.required }),
      visibility: new FormControl<ProjectVisibility>(project.visibility, { nonNullable: true, validators: Validators.required }),
      featured: new FormControl<boolean>(project.featured, { nonNullable: true, validators: Validators.required }),
      allowComments: new FormControl<boolean>(project.allowComments, { nonNullable: true, validators: Validators.required })
    });
  }

  onProjectContentChange({editor}: ChangeEvent) {
    if (editor) this.content?.setValue(editor.getData());
  }

  setSlug(event: Event): void {
    this.slug?.setValue(this.slugify.transform((event.target as HTMLInputElement).value));
  }

  async save() {
    this.loading = true;

    this.editForm.disable();

    const slugChanged = this.projectSnapshot?.slug != this.slug.value;
    /** check if slug was changed */
    if (slugChanged) {
      /** check if project already exists */
      if (await this.db.docExists(`projects/${this.slug.value}`)) {
        this.logger.error(`Project with this name already exists, try changing the name or slug`);
        this.loading = false;
        return;
      }
    }

    const project: Partial<WriteProject> = {
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
      updated: this.db.timestamp
    };

    await this.db.batch(async batch => {
      /** check tags for changes */
      const previousTags = this.projectSnapshot?.tags ?? [];
      const currentTags = project?.tags ?? [];
      const sameTags = previousTags.length === currentTags.length && previousTags.every((tag, index) => { return tag === currentTags[index] });
      if (!sameTags) {
        const removedTags = this.tagsService.removedTags(previousTags, currentTags);
        const addedTags = this.tagsService.addedTags(previousTags, currentTags);

        /** update tags removed from project */
        for (let i = 0; i < removedTags.length; i++) {
          const tag = removedTags[i];
          const tagUpdates = { projects: arrayRemove(project.slug), updated: this.db.timestamp };
          batch.update(this.db.doc(`tags/${tag}`), tagUpdates);
        }
        /** update tags added to project */
        for (let i = 0; i < addedTags.length; i++) {
          const addTag = addedTags[i];
          if (this.allTags.some(tag => tag.slug == addTag)) {
            const tagUpdates: Partial<Tag> = { projects: arrayUnion(project.slug), updated: this.db.timestamp };
            batch.update(this.db.doc(`tags/${addTag}`), tagUpdates);
          } else {
            const newTag: Tag = {
              slug: addTag,
              projects: arrayRemove(project.slug),
              created: this.db.timestamp,
              featured: false
            };
            batch.update(this.db.doc(`tags/${addTag}`), newTag);
          }
        }
      }

      /** save project changes */
      const projectRef = this.db.doc(`projects/${project.slug}`);
      batch.update(projectRef, project);

      /** check project slug for changes */
      if (this.projectSnapshot?.slug != project.slug) {
        /* create new project */
        batch.set(this.db.doc(`projects/${project.slug}`), project);

        /** remove old slug and add new slug to tags */
        if (project.tags?.length) {
          for (const tag of project.tags) {
            const tagRef = this.db.doc(`tags/${tag}`);
            batch.update(tagRef, {products: arrayRemove(this.projectSnapshot?.slug)});
            batch.update(tagRef, {products: arrayUnion(project.slug)});
          }
        }

        /** remove old project */
        batch.delete(projectRef);
      }
    }).then(() => this.logger.log(`Updated project`))
      .then(() => this.router.navigate([nav_path.adminProjects]))
      .catch(error => this.logger.error(`Something went wrong updating project`, [error, project]))
      .finally(() => {
        this.editForm.enable();
        this.loading = false;
      });
  }
}
