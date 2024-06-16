import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import {
  Project,
  ProjectStatus,
  ProjectVisibility, ProjectWithID, ReadProject,
} from '../interfaces/project';
import {
  arrayRemove,
  arrayUnion, DocumentData,
  DocumentReference,
  increment,
  QueryConstraint,
  where,
} from '@angular/fire/firestore';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';
import { ConsoleLoggerService } from './console-logger.service';
import { Comment, CommentWithID, WriteComment } from '../interfaces/comment';
import {
  CommentsDialogComponent,
  CommentsDialogContract,
// eslint-disable-next-line max-len
} from '../../features/projects/project-detail/comments-dialog/comments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User, UserWithID } from '../interfaces/user';
import { ProjectsFilter } from '../enums/projects-filter';
import { appInformation } from '../../information';
import { navPath } from '../../app.routes';
import { Technology } from '../interfaces/technology';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly collectionName = 'projects';

  constructor(
    private dialog: MatDialog,
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
  ) {}

  /**
   * Retrieves an Observable stream of featured projects from Firestore.
   *
   * @remarks
   * Applies the following filters to the Firestore query:
   *   - `featured`: true - Only retrieves projects marked as featured.
   *   - `status`: not equal to 'DRAFT' - Excludes projects in draft status.
   *   - `visibility`: 'PUBLIC' - Ensures only publicly visible projects are
   *   returned.
   *
   * Includes error handling to gracefully handle Firestore errors and ensure
   * an empty array is emitted on failure.
   *
   * @return {Observable<Project[]>} An Observable emitting an array of
   * featured projects, or an empty array if an error occurs.
   */
  get featuredProjects$(): Observable<ProjectWithID[]> {
    return this.db.colQuery$<ProjectWithID>(
      `projects`,
      { idField: 'id' },
      where('featured', '==', true),
      where('status', '!=', ProjectStatus.DRAFT),
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ).pipe(
      catchError((error: FirebaseError) => {
        this.logger.error(
          `Error loading featured projects`, error,
        );
        return of([]);
      }),
    );
  }

  getProjectById$(projectId: string): Observable<ProjectWithID | null> {
    return this.db.doc$<ReadProject>(`${this.collectionName}/${projectId}`)
      .pipe(
        switchMap(async (project) => {
          if (!project) {
            return null;
          }

          if (!project?.shards) return project;

          /** increment view count */
          const shardId = Math.floor(Math.random() * project.shards).toString();
          const shardRef = this.db.doc<object>(
            `${this.collectionName}/${project.slug}/shards/${shardId}`,
          );
          await this.db.update(shardRef, { views: increment(1) });

          /** get view count from shards */
          let views = 0;
          for (let i = 0; i < project.shards; i++) {
            const shardSnap = await this.db.docSnap(
              `${this.collectionName}/${project.slug}/shards/${i.toString()}`,
            );
            views = views + shardSnap.get('views');
          }

          return Object.assign({ views }, project);
        }),
        map((project) => {
          return Object.assign({ id: projectId }, project) as ProjectWithID;
        }),
        catchError((error: FirebaseError) => {
          this.logger.error('Error loading project', error);
          return of(null);
        }),
      );
  }

  getProjectComments$(
    projectId: string,
  ): Observable<CommentWithID[] | null> {
    return this.db.col$<CommentWithID>(
      `${this.collectionName}/${projectId}/comments`,
      { idField: 'id' },
    ).pipe(
      /** Sort comments by newest first */
      map((comments) => {
        return comments.sort((a, b) => b.created.seconds - a.created.seconds);
      }),
    );
  }

  getRelatedProjectsByTags$(
    projectId: string,
    projectTags: string[] | null,
  ): Observable<ProjectWithID[] | null> {
    if (!projectTags?.length) return of(null);

    return this.db.colQuery$<ProjectWithID>(
      this.collectionName,
      { idField: 'id' },
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
      /** filter out drafts */
      where('status', '!=', ProjectStatus.DRAFT),
    ).pipe(
      /** filter projects if they don't match current project's tags */
      map((projects) => {
        return projects.filter((p) => {
          if (!p?.tags?.length) return false;
          if (p.id === projectId) return false;

          return p?.tags.some((t) => projectTags?.includes(t));
        });
      }),
      /** sort related projects by decreasing number of matching tags */
      map((relatedProjects) => {
        return relatedProjects.sort((a, b) => {
          const aIntersection = a?.tags
            ?.filter((t) => projectTags?.includes(t)) ?? [];
          const bIntersection = b?.tags
            ?.filter((t) => projectTags?.includes(t)) ?? [];
          return bIntersection.length - aIntersection.length;
        });
      }),
    );
  }

  openProjectCommentsDialogById(
    projectId: string,
    user$: Observable<UserWithID>,
  ): void {
    const commentsDialogContract: CommentsDialogContract = {
      comments$: this.getProjectComments$(projectId),
      selectedComment: undefined,
      user$,
      projectId,
    };
    this.dialog.open(CommentsDialogComponent, {
      id: 'project-comments-dialog',
      data: commentsDialogContract,
    });
  }

  getProjectReference<
    AppModelType extends DocumentData,
    DbModelType extends AppModelType = AppModelType,
  >(projectId: string) {
    return this.db.doc<AppModelType, DbModelType>(
      `${this.collectionName}/${projectId}`,
    );
  }

  async addProjectComment(
    projectId: string,
    user: UserWithID,
    userRef: DocumentReference<User>,
    message: string,
  ) {
    const comment: WriteComment = {
      parent: this.getProjectReference(projectId),
      user: userRef,
      content: message,
      created: this.db.timestamp,
      author: {
        name: user?.displayName,
        image: user?.photoURL,
      },
    };

    return this.db.add<Comment>(`${comment.parent?.path}/comments`, comment)
      .catch((error: FirebaseError) => {
        this.logger.error(
          `Error adding comment to project`, error, comment,
        );
      });
  }

  getFilteredProjects$(
    filter: ProjectsFilter,
  ): Observable<ProjectWithID[]> {
    const queryConstraints: QueryConstraint[] = [
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ];

    switch (filter) {
      case ProjectsFilter.ALL:
        /** filter out drafts */
        queryConstraints.push(where('status', '!=', ProjectStatus.DRAFT));
        break;
      case ProjectsFilter.ACTIVE:
        /** only show published projects */
        queryConstraints.push(where('status', '==', ProjectStatus.PUBLISHED));
        break;
      case ProjectsFilter.ARCHIVED:
        /** only show archived projects */
        queryConstraints.push(where('status', '==', ProjectStatus.ARCHIVED));
        break;
      default:
        this.logger.warn(`Something went wrong filtering projects`, filter);
        break;
    }

    return (this.db.colQuery$<ProjectWithID>(
      `projects`,
      { idField: 'id' },
      ...queryConstraints,
    )).pipe(
      /** sort by featured projects */
      map((projects) => projects.sort((a, b) => {
        return b.featured.toString().localeCompare(a.featured.toString());
      })),
    );
  }

  async shareProject(project: ReadProject) {
    const host = `https://${appInformation.website}`;
    const path = `${navPath.projects}/${project.slug}`;
    const url = host + path;
    const title = project.name;
    const text = project.description;

    try {
      // Feature detection to see if the Web Share API is supported.
      if ('share' in navigator) {
        return await navigator.share({
          url,
          text,
          title,
        });
      }

      // Fallback to use Twitter's Web Intent URL.
      // (https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)
      const shareURL = new URL('https://twitter.com/intent/tweet');
      const params = new URLSearchParams();
      params.append('text', text);
      params.append('title', title);
      params.append('url', url);
      shareURL.search = params.toString();
      window.open(shareURL, '_blank', 'popup,noreferrer,noopener');
    } catch (error: unknown) {
      this.logger.error('Error sharing project', error);
    }
  }

  getProjectsByTechnology$(id: string) {
    const technologyRef = this.db.doc<Technology>(`technologies/${id}`);
    return this.db.colQuery$<ProjectWithID>(
      this.collectionName,
      { idField: 'id' },
      where('technologies', 'array-contains', technologyRef),
    );
  }

  get getAllProjects$() {
    return this.db.col$<ProjectWithID>(this.collectionName, { idField: 'id' });
  }

  async addTechnologiesToProjects(
    technologyIds: string[],
    projectIds: string[],
  ) {
    return this.db.batch(async (batch) => {
      const technologyRefs = technologyIds.map((id) => {
        return this.db.doc<Technology>(`technologies/${id}`);
      });
      const projectRefs = projectIds.map((id) => {
        return this.getProjectReference(id);
      });

      /** add project to technologies */
      for (let i = 0; i < technologyRefs.length; i++) {
        const technologyRef = technologyRefs[i];
        const technologyUpdates: Partial<Technology> = {
          projects: arrayUnion(...projectRefs),
        };
        batch.update(technologyRef, technologyUpdates);
      }

      /** add technology to projects */
      for (let j = 0; j < projectRefs.length; j++) {
        const projectRef = projectRefs[j];
        const projectUpdates: Partial<Project> = {
          technologies: arrayUnion(...technologyRefs),
        };
        batch.update(projectRef, projectUpdates);
      }
    });
  }

  async removeTechnologiesFromProjects(
    technologyIds: string[],
    projectIds: string[],
  ) {
    return this.db.batch(async (batch) => {
      const technologyRefs = technologyIds.map((id) => {
        return this.db.doc<Technology>(`technologies/${id}`);
      });
      const projectRefs = projectIds.map((id) => {
        return this.getProjectReference(id);
      });

      /** remove project to technologies */
      for (let i = 0; i < technologyRefs.length; i++) {
        const technologyRef = technologyRefs[i];
        const technologyUpdates: Partial<Technology> = {
          projects: arrayRemove(...projectRefs),
        };
        batch.update(technologyRef, technologyUpdates);
      }

      /** remove technology to projects */
      for (let j = 0; j < projectRefs.length; j++) {
        const projectRef = projectRefs[j];
        const projectUpdates: Partial<Project> = {
          technologies: arrayRemove(...technologyRefs),
        };
        batch.update(projectRef, projectUpdates);
      }
    });
  }
}
