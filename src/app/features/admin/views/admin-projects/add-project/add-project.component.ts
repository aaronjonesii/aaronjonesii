import { Component, OnDestroy, signal } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import { Router } from '@angular/router';
import {
  arrayRemove,
  arrayUnion,
  DocumentReference,
} from '@angular/fire/firestore';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { User } from '@angular/fire/auth';
import {
  FormArray, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ProjectImageComponent,
} from '../project-image/project-image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectTagsComponent } from '../project-tags/project-tags.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  AdminEditorComponent,
} from '../../../shared/admin-editor/admin-editor.component';
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import {
  TopAppBarComponent,
} from '../../../../../shared/components/top-app-bar/top-app-bar.component';
import { SlugifyPipe } from '../../../../../shared/pipes/slugify.pipe';
import { ProjectForm } from '../../../../../shared/forms/project-form';
import {
  ProjectStats,
  ProjectStatus, ProjectVisibility, WriteProject,
} from '../../../../../shared/interfaces/project';
import { Tag } from '../../../../../shared/interfaces/tag';
import {
  FirestoreService,
} from '../../../../../shared/services/firestore.service';
import { navPath } from '../../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../../shared/services/console-logger.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import {
  TopAppBarService,
} from '../../../../../shared/components/top-app-bar/top-app-bar.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Technology } from '../../../../../shared/interfaces/technology';
import {
  ProjectTechnologiesComponent,
} from '../project-technologies/project-technologies.component';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import {
  ProjectsService,
} from '../../../../../shared/services/projects.service';

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
    ProjectTechnologiesComponent,
  ],
  providers: [SlugifyPipe],
})
export class AddProjectComponent implements OnDestroy {
  readonly title = 'Add Project';
  loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();
  addForm = new FormGroup<ProjectForm>({
    name: new FormControl<string>(
      '',
      { nonNullable: true, validators: Validators.required },
    ),
    description: new FormControl<string>(
      '',
      { nonNullable: true, validators: Validators.required },
    ),
    slug: new FormControl<string>(
      '',
      { nonNullable: true, validators: Validators.required },
    ),
    content: new FormControl<string | null>(null),
    image: new FormControl<string | null>(null),
    tags: new FormArray<FormControl<string>>([]),
    livePreviewLink: new FormControl<string | null>(null),
    sourceCodeLink: new FormControl<string | null>(null),
    status: new FormControl<ProjectStatus>(
      ProjectStatus.DRAFT,
      { nonNullable: true, validators: Validators.required },
    ),
    visibility: new FormControl<ProjectVisibility>(
      ProjectVisibility.PUBLIC,
      { nonNullable: true, validators: Validators.required },
    ),
    featured: new FormControl<boolean>(
      false,
      { nonNullable: true, validators: Validators.required },
    ),
    allowComments: new FormControl<boolean>(
      true,
      { nonNullable: true, validators: Validators.required },
    ),
    technologies: new FormArray<FormControl<Technology>>([]),
  });
  readonly projectStatuses = ProjectStatus;
  readonly projectVisibilities = ProjectVisibility;
  tagsSignal = toSignal(this.db.col$<Tag>(`tags`));
  editorConfig = {
    placeholder: 'Write content here...',
    wordCount: {
      onUpdate: (stats: ProjectStats) => this.projectStats.set(stats),
    },
  };
  user$ = this.auth.loadUser;
  private subscriptions = new Subscription();
  technologiesSignal = toSignal(this.technologiesService.getTechnologies$);
  projectStats = signal<ProjectStats>({ characters: 0, words: 0 });

  constructor(
    private router: Router,
    private auth: AuthService,
    private db: FirestoreService,
    private slugify: SlugifyPipe,
    private logger: ConsoleLoggerService,
    private projectsService: ProjectsService,
    private topAppBarService: TopAppBarService,
    private technologiesService: TechnologiesService,
  ) {
    this.subscriptions.add(
      this.loading$.subscribe((loading) => {
        this.topAppBarService.setOptions({
          title: `Admin ${this.title}`,
          showBackBtn: true,
          loading,
        });
      }),
    );
  }
  get image() {
    return this.addForm.controls.image;
  }
  get name() {
    return this.addForm.controls.name;
  }
  get description() {
    return this.addForm.controls.description;
  }
  get slug() {
    return this.addForm.controls.slug;
  }
  get technologiesCtrl() {
    return this.addForm.controls.technologies;
  }
  get tags() {
    return this.addForm.controls.tags;
  }
  get livePreviewLink() {
    return this.addForm.controls.livePreviewLink;
  }
  get sourceCodeLink() {
    return this.addForm.controls.sourceCodeLink;
  }
  get content() {
    return this.addForm.controls.content;
  }
  get featured() {
    return this.addForm.controls.featured;
  }
  get allowComments() {
    return this.addForm.controls.allowComments;
  }
  get status() {
    return this.addForm.controls.status;
  }
  get visibility() {
    return this.addForm.controls.visibility;
  }

  onProjectContentChange({ editor }: ChangeEvent) {
    if (editor) this.content?.setValue(editor.getData());
  }

  setSlug(event: Event): void {
    this.slug?.setValue(
      this.slugify.transform((event.target as HTMLInputElement).value),
    );
  }

  private resetForm() {
    this.addForm = new FormGroup<ProjectForm>({
      name: new FormControl<string>(
        '',
        { nonNullable: true, validators: Validators.required },
      ),
      description: new FormControl<string>(
        '',
        { nonNullable: true, validators: Validators.required },
      ),
      slug: new FormControl<string>(
        '',
        { nonNullable: true, validators: Validators.required },
      ),
      content: new FormControl<string | null>(null),
      image: new FormControl<string | null>(null),
      tags: new FormArray<FormControl<string>>([]),
      livePreviewLink: new FormControl<string | null>(null),
      sourceCodeLink: new FormControl<string | null>(null),
      status: new FormControl<ProjectStatus>(
        ProjectStatus.DRAFT,
        { nonNullable: true, validators: Validators.required },
      ),
      visibility: new FormControl<ProjectVisibility>(
        ProjectVisibility.PUBLIC,
        { nonNullable: true, validators: Validators.required },
      ),
      featured: new FormControl<boolean>(
        false,
        { nonNullable: true, validators: Validators.required },
      ),
      allowComments: new FormControl<boolean>(
        true,
        { nonNullable: true, validators: Validators.required },
      ),
      technologies: new FormArray<FormControl<Technology>>([]),
    });
  }

  async save(user: User) {
    this.loadingSubject.next(true);

    this.addForm.disable();

    if (await this.db.docExists(`projects/${this.slug.value}`)) {
      this.logger.error(
        `Project with this name already exists, try changing the name or slug`,
      );
      this.loadingSubject.next(false);
      this.addForm.enable();
      return;
    }

    const technologies = this.technologiesCtrl.value;

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
      roles: { [user.uid]: 'owner' },
      shards: 5, // Initialize number of shards
      author: { name: user.displayName ?? '', image: user.photoURL ?? null },
    };

    await this.db.batch(async (batch) => {
      /** tags */
      if (project.tags?.length) {
        for (let i = 0; i < project.tags.length; i++) {
          const projectTag = project.tags[i];
          if (this.tagsSignal()?.find((tag) => tag.slug == projectTag)) {
            const tagUpdates: Partial<Tag> = {
              projects: arrayRemove(projectTag),
              updated: this.db.timestamp,
            };
            batch.update(this.db.doc(`tags/${projectTag}`), tagUpdates);
          } else {
            const newTag: Tag = {
              slug: projectTag,
              projects: arrayUnion(project.slug),
              created: this.db.timestamp,
              featured: false,
            };
            batch.set(this.db.doc(`tags/${projectTag}`), newTag);
          }
        }
      }

      if (technologies.length) {
        const projectRef = this.projectsService
          .getProjectReference(project.slug);
        const technologyRefs: DocumentReference<Technology>[] = [];

        for (let i = 0; i < technologies.length; i++) {
          const technology = technologies[i];
          if (technology.id) {
            const technologyRef =
              this.db.doc<Technology>(`technologies/${technology.id}`);
            technologyRefs.push(technologyRef);
            const technologyUpdates: Partial<Technology> = {
              projects: arrayUnion(projectRef),
              updated: this.db.timestamp,
            };
            batch.update(technologyRef, technologyUpdates);
          } else {
            const technologyRef =
              this.db.doc<Technology>(`technologies/${this.db.newDocumentID}`);
            technologyRefs.push(technologyRef);
            const technologyDocument: Technology = {
              name: technology.name,
              description: null,
              projects: arrayUnion(projectRef),
              logoImage: null,
              created: this.db.timestamp,
            };
            batch.set(technologyRef, technologyDocument);
          }
        }
        /* add project technology refs */
        project.technologies = technologyRefs;
      }

      /** shards for counts */
      /** Initialize each shard */
      for (let i = 0; i < project.shards; i++) {
        const shardRef = this.db.doc(
          `projects/${project.slug}/shards/${i.toString()}`,
        );
        batch.set(shardRef, { views: 0 });
      }

      const projectRef = this.db.doc(`projects/${project.slug}`);
      batch.set(projectRef, project);
    })
      .then(() => this.resetForm())
      .then(() => this.logger.log(`Project created`))
      .then(() => this.router.navigate([navPath.adminProjects]))
      .catch((error) => {
        this.logger.error(
          `Something went wrong creating project`, [error, project],
        );
        this.addForm.enable();
      })
      .finally(() => {
        this.addForm.enable();
        this.loadingSubject.next(false);
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
