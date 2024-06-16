import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import {
  arrayRemove,
  arrayUnion,
  DocumentReference,
} from '@angular/fire/firestore';
import {
  BehaviorSubject, lastValueFrom,
  Subscription,
} from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ProjectImageComponent,
} from '../project-image/project-image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectTagsComponent } from '../project-tags/project-tags.component';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  AdminEditorComponent,
} from '../../../shared/admin-editor/admin-editor.component';
import {
  TopAppBarComponent,
} from '../../../../../shared/components/top-app-bar/top-app-bar.component';
import {
  LoadingComponent,
} from '../../../../../shared/components/loading/loading.component';
import { SlugifyPipe } from '../../../../../shared/pipes/slugify.pipe';
import {
  Project,
  ProjectStats,
  ProjectStatus,
  ProjectVisibility,
  ProjectWithID,
  ProjectWithTech,
  ReadProject,
  WriteProject,
} from '../../../../../shared/interfaces/project';
import {
  initialProjectForm, ProjectForm,
} from '../../../../../shared/forms/project-form';
import { Tag } from '../../../../../shared/interfaces/tag';
import {
  FirestoreService,
} from '../../../../../shared/services/firestore.service';
import { TagsService } from '../../../../../shared/services/tags.service';
import { navPath } from '../../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../../shared/services/console-logger.service';
import {
  TopAppBarService,
} from '../../../../../shared/components/top-app-bar/top-app-bar.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ProjectTechnologiesComponent,
} from '../project-technologies/project-technologies.component';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import { Technology } from '../../../../../shared/interfaces/technology';
import {
  ProjectsService,
} from '../../../../../shared/services/projects.service';
import { tap } from 'rxjs/operators';

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
    AsyncPipe,
    ProjectTechnologiesComponent,
  ],
  providers: [SlugifyPipe],
})
export class EditProjectComponent implements OnInit, OnDestroy {
  readonly title = 'Edit project';
  private readonly projectID: string | null = null;
  private project?: ProjectWithTech;
  private projectSnapshot?: ProjectWithTech;
  editForm = initialProjectForm;
  readonly projectStatuses = ProjectStatus;
  readonly projectVisibilities = ProjectVisibility;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  tagsSignal = toSignal(this.db.col$<Tag>(`tags`));
  editorConfig = {
    placeholder: 'Write content here...',
    wordCount: {
      onUpdate: (stats: ProjectStats) => this.projectStats.set(stats),
    },
  };
  projectStats = signal<ProjectStats>({ characters: 0, words: 0 });
  private subscriptions = new Subscription();
  private user = toSignal(this.authService.loadUser);
  technologiesSignal = toSignal(
    this.technologiesService.getTechnologies$.pipe(
      tap((t) => console.debug(t)),
    ),
  );

  constructor(
    private router: Router,
    private slugify: SlugifyPipe,
    private db: FirestoreService,
    private route: ActivatedRoute,
    private tagsService: TagsService,
    private authService: AuthService,
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

    this.projectID = this.route.snapshot.paramMap.get('projectID');
  }
  ngOnInit() {
    this.db.docSnap<Project>(`projects/${this.projectID}`)
      .then(async (docSnapshot) => {
        if (!docSnapshot.exists()) {
          this.router.navigate([navPath.adminProjects]);
          this.logger.error(
            `Something went wrong loading project`, this.projectID,
          );
        } else {
          const project = docSnapshot.data();
          const projectWithId = {
            ...project,
            id: this.projectID || '',
          } as ReadProject as ProjectWithID;
          const projectWithTech$ = this.projectsService
            .projectWihTechnologies$(projectWithId);
          const projectWithTech = await lastValueFrom(projectWithTech$);
          this.projectSnapshot = projectWithTech;
          this.project = projectWithTech;
          this.setForm(this.project);
          this.loadingSubject.next(false);
        }
      }).catch((error: unknown) => {
        this.logger.error(
          'Something went wrong loading project to edit.', error,
        );
      });
  }
  get image() {
    return this.editForm.controls.image;
  }
  get name() {
    return this.editForm.controls.name;
  }
  get description() {
    return this.editForm.controls.description;
  }
  get slug() {
    return this.editForm.controls.slug;
  }
  get technologiesCtrl() {
    return this.editForm.controls.technologies;
  }
  get tags() {
    return this.editForm.controls.tags;
  }
  get livePreviewLink() {
    return this.editForm.controls.livePreviewLink;
  }
  get sourceCodeLink() {
    return this.editForm.controls.sourceCodeLink;
  }
  get content() {
    return this.editForm.controls.content;
  }
  get featured() {
    return this.editForm.controls.featured;
  }
  get allowComments() {
    return this.editForm.controls.allowComments;
  }
  get status() {
    return this.editForm.controls.status;
  }
  get visibility() {
    return this.editForm.controls.visibility;
  }

  private setForm(project: ProjectWithTech) {
    this.editForm = new FormGroup<ProjectForm>({
      name: new FormControl<string>(
        project.name,
        { nonNullable: true, validators: Validators.required },
      ),
      description: new FormControl<string>(
        project.description,
        { nonNullable: true, validators: Validators.required },
      ),
      slug: new FormControl<string>(
        project.slug,
        { nonNullable: true, validators: Validators.required },
      ),
      content: new FormControl<string | null>(project.content),
      image: new FormControl<string | null>(project.image),
      tags: new FormArray<FormControl<string>>(
        // eslint-disable-next-line max-len
        project.tags?.length ? project.tags?.map((tag) => new FormControl<string>(tag, { nonNullable: true })) : [],
      ),
      livePreviewLink: new FormControl<string | null>(project.livePreviewLink),
      sourceCodeLink: new FormControl<string | null>(project.sourceCodeLink),
      status: new FormControl<ProjectStatus>(
        project.status,
        { nonNullable: true, validators: Validators.required },
      ),
      visibility: new FormControl<ProjectVisibility>(
        project.visibility,
        { nonNullable: true, validators: Validators.required },
      ),
      featured: new FormControl<boolean>(
        project.featured,
        { nonNullable: true, validators: Validators.required },
      ),
      allowComments: new FormControl<boolean>(
        project.allowComments,
        { nonNullable: true, validators: Validators.required },
      ),
      technologies: new FormArray<FormControl<Technology>>(
        <FormControl<Technology>[]>project.technologies
          .map((t) => new FormControl(t))
      ),
    });
  }

  onProjectContentChange({ editor }: ChangeEvent) {
    if (editor) this.content?.setValue(editor.getData());
  }

  setSlug(event: Event): void {
    this.slug?.setValue(
      this.slugify.transform((event.target as HTMLInputElement).value),
    );
  }

  async save() {
    const user = this.user();
    if (!user || this.editForm.invalid) return;
    this.loadingSubject.next(true);

    this.editForm.disable();

    const slugChanged = this.projectSnapshot?.slug != this.slug.value;
    /** check if slug was changed */
    if (slugChanged) {
      /** check if project already exists */
      if (await this.db.docExists(`projects/${this.slug.value}`)) {
        // eslint-disable-next-line max-len
        this.logger.error(`Project with this name already exists, try changing the name or slug`);
        this.loadingSubject.next(false);
        return;
      }
    }

    const technologies = this.technologiesCtrl.value.filter((t) => !!t.id);
    const technologiesToBeCreated = this.technologiesCtrl.value
      .filter((t) => !t.id);

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
      updated: this.db.timestamp,
    };

    await this.db.batch(async (batch) => {
      /** check tags for changes */
      const previousTags = this.projectSnapshot?.tags ?? [];
      const currentTags = project?.tags ?? [];
      const sameTags = previousTags.length === currentTags.length &&
        previousTags.every((tag, index) => tag === currentTags[index]);
      if (!sameTags) {
        const removedTags = this.tagsService
          .removedTags(previousTags, currentTags);
        const addedTags = this.tagsService.addedTags(previousTags, currentTags);

        /** update tags removed from project */
        for (let i = 0; i < removedTags.length; i++) {
          const tag = removedTags[i];
          const tagUpdates = {
            projects: arrayRemove(project.slug),
            updated: this.db.timestamp,
          };
          batch.update(this.db.doc(`tags/${tag}`), tagUpdates);
        }
        /** update tags added to project */
        for (let i = 0; i < addedTags.length; i++) {
          const addTag = addedTags[i];
          if (this.tagsSignal()?.find((tag) => tag.slug == addTag)) {
            const tagUpdates: Partial<Tag> = {
              projects: arrayUnion(project.slug),
              updated: this.db.timestamp,
            };
            batch.update(this.db.doc(`tags/${addTag}`), tagUpdates);
          } else {
            const newTag: Partial<Tag> = {
              slug: addTag,
              projects: arrayRemove(project.slug),
              created: this.db.timestamp,
              featured: false,
            };
            batch.set(this.db.doc(`tags/${addTag}`), newTag);
          }
        }
      }

      /** check technologies for changes */
      const previousTechnologies = this.projectSnapshot?.technologies || [];
      const newTechnologies = technologies;
      const sameTechnologies =
        previousTechnologies.length === newTechnologies.length &&
        previousTechnologies.every((t, i) => {
          return t.id === newTechnologies[i].id;
        });
      if (!sameTechnologies || technologiesToBeCreated.length) {
        const removedTechnologies = previousTechnologies.filter((p) => {
          return !newTechnologies.some((n) => p.id === n.id);
        });
        const addedTechnologies = newTechnologies.filter((n) => {
          return !previousTechnologies.some((p) => n.id === p.id);
        });
        const projectRef =
          this.projectsService.getProjectReference(<string>project.slug);

        /* add project to technologies */
        for (let i = 0; i < addedTechnologies.length; i++) {
          const technology = addedTechnologies[i];
          const technologyRef =
            this.db.doc<Technology>(`technologies/${technology.id}`);
          const technologyUpdates: Partial<Technology> = {
            projects: arrayUnion(projectRef),
            updated: this.db.timestamp,
          };
          batch.update(technologyRef, technologyUpdates);
        }

        /* remove project from technologies */
        for (let i = 0; i < removedTechnologies.length; i++) {
          const technology = removedTechnologies[i];
          const technologyRef =
            this.db.doc<Technology>(`technologies/${technology.id}`);
          const technologyUpdates: Partial<Technology> = {
            projects: arrayRemove(projectRef),
            updated: this.db.timestamp,
          };
          batch.update(technologyRef, technologyUpdates);
        }

        /* create technologies that does not exist yet */
        const createdTechnologyRefs:
          DocumentReference<Technology, Technology>[] = [];
        for (let i = 0; i < technologiesToBeCreated.length; i++) {
          const technology = technologiesToBeCreated[i];
          const technologyRef =
            this.db.doc<Technology>(`technologies/${this.db.newDocumentID}`);
          createdTechnologyRefs.push(technologyRef);
          const newTechnologyDocument: Technology = {
            name: technology.name,
            description: null,
            logoImage: null,
            projects: arrayUnion(projectRef),
            created: this.db.timestamp,
          };
          batch.set(technologyRef, newTechnologyDocument);
        }

        /* update project technology refs */
        project.technologies = technologies
          .map((t) => this.db.doc<Technology>(`technologies/${t.id}`))
          .concat(createdTechnologyRefs);
      } else {
        project.technologies = (this.projectSnapshot?.technologies || [])
          .map((t) => this.db.doc<Technology>(`technologies/${t.id}`));
      }

      /** save project changes */
      const projectRef = this.db.doc(`projects/${this.projectSnapshot?.slug}`);
      batch.update(projectRef, project);

      /** check project slug for changes */
      if (this.projectSnapshot?.slug != project.slug) {
        /** create new project */
        project.roles = this.projectSnapshot?.roles || { [user.uid]: 'owner' };
        batch.set(this.db.doc(`projects/${project.slug}`), project);

        /** remove old slug and add new slug to tags */
        if (project.tags?.length) {
          for (const tag of project.tags) {
            const tagRef = this.db.doc<Tag>(`tags/${tag}`);
            batch.update<Tag, Partial<Tag>>(
              tagRef,
              {
                projects: arrayRemove(this.projectSnapshot?.slug),
              },
            );
            batch.update<Tag, Partial<Tag>>(
              tagRef,
              {
                projects: arrayUnion(project.slug),
              },
            );
          }
        }

        /** remove old project */
        batch.delete(projectRef);
      }
    }).then(() => this.logger.log(`Updated project`))
      .then(() => this.router.navigate([navPath.adminProjects]))
      .catch((error) => {
        this.logger.error(
          `Something went wrong updating project`,
          [error, project],
        );
      })
      .finally(() => {
        this.editForm.enable();
        this.loadingSubject.next(false);
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
