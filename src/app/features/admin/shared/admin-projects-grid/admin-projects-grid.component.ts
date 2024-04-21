import { Component, Input } from '@angular/core';
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { NgClass, NgOptimizedImage } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";
import { ProjectWithID } from "../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../shared/services/firestore.service";
import {
  ConfirmDialogComponent,
  ConfirmDialogContract
} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { nav_path } from '../../../../app.routes';
import { ConsoleLoggerService } from "../../../../shared/services/console-logger.service";
import { first } from "rxjs";

@Component({
  selector: 'aj-admin-projects-grid',
  templateUrl: './admin-projects-grid.component.html',
  styleUrl: './admin-projects-grid.component.scss',
  standalone: true,
  imports: [
    NgClass,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    RouterLink,
    NgOptimizedImage,
  ],
})
export class AdminProjectsGridComponent {
  @Input() projects: ProjectWithID[] = [];
  readonly nav_path = nav_path;
  selectionModel = new SelectionModel<ProjectWithID>(true, []);
  loading = false;

  constructor(
    private dialog: MatDialog,
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
  ) {}

  get allSelected(): boolean {
    return this.selectionModel.selected.length === this.projects.length;
  }
  async selectAll(selectAll: boolean) {
    if (selectAll) {
      this.selectionModel.setSelection(...this.projects);
    } else this.selectionModel.clear();
  }
  get someSelected(): boolean {
    return !this.selectionModel.isEmpty() && !this.allSelected;
  }

  async updateFeaturedProject(id: string, featured: boolean) {
    this.loading = true;

    await this.db.update(`projects/${id}`, { featured })
      .then(() => this.logger.log(`project is ${featured ? 'now featured' : 'no longer featured'}`))
      .catch(error => this.logger.error(`Something went wrong updating project`, [error, id, featured]))
      .finally(() => this.loading = false)
  }

  async deleteSelectedProjects() {
    this.loading = true;
    const confirmDialogContract : ConfirmDialogContract = {
      title: 'Delete all selected projects?',
      description: 'All selected projects will be permanently deleted and cannot be undone'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      id: 'confirm-delete-project-dialog',
      width: undefined,
      height: undefined,
      data: confirmDialogContract,
    });

    dialogRef.afterClosed().pipe(first()).forEach(async _delete => {
      if (_delete) {
        const removedProjects: string[] = [];

        for (const project of this.selectionModel.selected) {
          await this._deleteProject(project.id).then(() => {
            this.selectionModel.deselect(project);
            removedProjects.push(project.id);
          }).catch(error => this.logger.error(`Something went wong deleting project`, error, project));
        }

        this.logger.log(`removed ${removedProjects.length} ${removedProjects.length === 1 ? 'project' : 'projects'}`, removedProjects);
      }
      this.loading = false;
    });
  }

  async publishSelectedProjects() {
    try {
      this.loading = true;
      const publishedProjects: string[] = [];

      for (const project of this.selectionModel.selected) {
        if (project.status == 'published') {
          this.selectionModel.deselect(project);
          continue;
        }

        await this.publishProject(project.id, false)
          .then(() => {
            this.selectionModel.deselect(project);
            publishedProjects.push(project.id);
          }).catch(error => { throw new error; });
      }

      if (publishedProjects.length) this.logger.log(`published ${publishedProjects.length == 1 ? 'project' : 'projects'}`);
    } catch (error) {
      this.logger.error(`Something went wrong publishing projects`, error);
    } finally { this.loading = false; }
  }
  async publishProject(id: string, notify = true) {
    this.loading = true;

    return await this.db.update(
      `projects/${id}`,
      {
        status: 'published',
        updated: this.db.timestamp
      }
    ).then(() => { if (notify) this.logger.log(`published project`) })
      .catch(error => { if (notify) this.logger.error(`Something went wong publishing project`, error, id) })
      .finally(() => this.loading = false);
  }

  async deleteProject(id: string, notify = true) {

      this.loading = true;

      const confirmDialogContract: ConfirmDialogContract = {
        title: 'Delete this project?',
        description: 'This project will be permanently deleted and cannot be recovered.'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        id: 'confirm-delete-project-dialog',
        width: undefined,
        height: undefined,
        data: confirmDialogContract,
      });

      dialogRef.afterClosed().forEach(async _delete => {
        if (_delete) {
          this._deleteProject(id)
            .then(() => { if (notify) this.logger.log(`Project deleted`) })
            .catch(error => { if (notify) this.logger.error(`Something went wrong deleting project`, error, id) });
        }
        this.loading = false;
      });
  }

  async _deleteProject(id: string) {
    return await this.db.batch(async batch => {
      const projectRef = this.db.doc(`projects/${id}`);

      /** delete comments */
      const commentsSnap = await this.db.colSnap(`${projectRef.path}/comments`);
      commentsSnap.forEach(commentSnap => batch.delete(commentSnap.ref));

      /** delete shards */

      const shardsSnap = await this.db.colSnap(`${projectRef.path}/shards`);
      shardsSnap.forEach(shardSnap => batch.delete(shardSnap.ref));

      /** delete project */
      batch.delete(projectRef);
    });
  }

  allDraftsSelected(): boolean {
    return this.selectionModel.selected.every(project => project.status != 'published');
  }
}
