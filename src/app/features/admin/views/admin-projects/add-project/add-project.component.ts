import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { User } from "@angular/fire/auth";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProjectImageComponent } from "../project-image/project-image.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ProjectTagsComponent } from "../project-tags/project-tags.component";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AdminEditorComponent } from "../../../shared/admin-editor/admin-editor.component";
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from "@angular/common";
import { TopAppBarComponent } from "../../../../../shared/components/top-app-bar/top-app-bar.component";
import { SlugifyPipe } from "../../../../../shared/pipes/slugify.pipe";
import { ProjectForm } from "../../../../../shared/forms/project-form";
import { ProjectStatus, ProjectVisibility, WriteProject } from "../../../../../shared/interfaces/project";
import { Tag } from "../../../../../shared/interfaces/tag";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";
import { TagsService } from "../../../../../shared/services/tags.service";
import { AuthService } from "../../../../../core/services/auth.service";
import { nav_path } from "../../../../../app-routing.module";

@Component({
  selector: 'aj-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
  standalone: true,
  imports: [
    TopAppBarComponent,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ProjectImageComponent,
    MatFormFieldModule,
    MatInputModule,
    ProjectTagsComponent,
    KeyValuePipe,
    TitleCasePipe,
    MatSelectModule,
    MatCheckboxModule,
    AdminEditorComponent,
  ],
  providers: [SlugifyPipe],
})
export class AddProjectComponent {
  readonly title = 'Add Project';
  loading = false;
  addForm = new FormGroup<ProjectForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    slug: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    content: new FormControl<string | null>(null),
    image: new FormControl<string | null>(null),
    tags: new FormArray<FormControl<string>>([]),
    livePreviewLink: new FormControl<string | null>(null),
    sourceCodeLink: new FormControl<string | null>(null),
    status: new FormControl<ProjectStatus>(ProjectStatus.DRAFT, { nonNullable: true, validators: Validators.required }),
    visibility: new FormControl<ProjectVisibility>(ProjectVisibility.PUBLIC, { nonNullable: true, validators: Validators.required }),
    featured: new FormControl<boolean>(false, { nonNullable: true, validators: Validators.required }),
    allowComments: new FormControl<boolean>(true, { nonNullable: true, validators: Validators.required })
  });
  readonly projectStatuses = ProjectStatus;
  readonly projectVisibilities = ProjectVisibility
  allTags$: Observable<Tag[]>;
  private allTags: Tag[] = [];
  editorConfig = {
    placeholder: 'Write content here...',
    wordCount: {
      onUpdate: (stats:{characters: number, words: number}) => {
        const storyCharacterCount = stats.characters;
        const storyWordCount = stats.words;
        /** todo: use these values */
        console.log(`content character count`, storyCharacterCount);
        console.log(`content word count`, storyWordCount);
      }
    }
  };
  user$ = this.auth.loadUser;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    private tagsService: TagsService,
    private slugify: SlugifyPipe,
    private router: Router,
    private auth: AuthService,
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
  get image() { return this.addForm.controls.image; }
  get name() { return this.addForm.controls.name; }
  get description() { return this.addForm.controls.description; }
  get slug() { return this.addForm.controls.slug; }
  get tags() { return this.addForm.controls.tags; }
  get livePreviewLink() { return this.addForm.controls.livePreviewLink; }
  get sourceCodeLink() { return this.addForm.controls.sourceCodeLink; }
  get content() { return this.addForm.controls.content; }
  get featured() { return this.addForm.controls.featured; }
  get allowComments() { return this.addForm.controls.allowComments; }
  get status() { return this.addForm.controls.status; }
  get visibility() { return this.addForm.controls.visibility; }

  onProjectContentChange({editor}: ChangeEvent) {
    if (editor) this.content?.setValue(editor.getData());
  }

  setSlug(event: Event): void {
    this.slug?.setValue(this.slugify.transform((event.target as HTMLInputElement).value));
  }

  private resetForm() {
    this.addForm = new FormGroup<ProjectForm>({
      name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      description: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      slug: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      content: new FormControl<string | null>(null),
      image: new FormControl<string | null>(null),
      tags: new FormArray<FormControl<string>>([]),
      livePreviewLink: new FormControl<string | null>(null),
      sourceCodeLink: new FormControl<string | null>(null),
      status: new FormControl<ProjectStatus>(ProjectStatus.DRAFT, { nonNullable: true, validators: Validators.required }),
      visibility: new FormControl<ProjectVisibility>(ProjectVisibility.PUBLIC, { nonNullable: true, validators: Validators.required }),
      featured: new FormControl<boolean>(false, { nonNullable: true, validators: Validators.required }),
      allowComments: new FormControl<boolean>(true, { nonNullable: true, validators: Validators.required })
    });
  }

  async save(user: User) {
    this.loading = true;

    this.addForm.disable();

    if (await this.db.docExists(`projects/${this.slug.value}`)) {
      this.cLog.error(`Project with this name already exists, try changing the name or slug`);
      this.loading = false;
      this.addForm.enable();
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
      updated: null,
      roles: {[user.uid]: 'owner'},
      shards: 5, // Initialize number of shards
      author: { name: user.displayName ?? '', image: user.photoURL ?? null },
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

      /** shards for counts */
      /** Initialize each shard */
      for (let i = 0; i < project.shards; i++) {
        const shardRef = this.db.doc(`projects/${project.slug}/shards/${i.toString()}`);
        batch.set(shardRef, { views: 0 });
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
