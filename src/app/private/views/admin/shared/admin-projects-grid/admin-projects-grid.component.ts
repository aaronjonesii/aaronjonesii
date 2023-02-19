import { Component, Input } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";
import { ProjectWithID } from "../../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { ConfirmDialogComponent } from "../../../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'aj-admin-projects-grid',
  templateUrl: './admin-projects-grid.component.html',
  styleUrls: ['./admin-projects-grid.component.scss']
})
export class AdminProjectsGridComponent {
  @Input() projects: ProjectWithID[] = [];
  public readonly nav_path = nav_path;
  public selectionModel = new SelectionModel<ProjectWithID>(true, []);
  public loading = false;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    private dialog: MatDialog
  ) {}

  public get allSelected(): boolean {
    return this.selectionModel.selected.length === this.projects.length;
  }
  public async selectAll(selectAll: boolean) {
    if (selectAll) {
      this.selectionModel.setSelection(...this.projects);
    } else this.selectionModel.clear();
  }
  public get someSelected(): boolean {
    return !this.selectionModel.isEmpty() && !this.allSelected;
  }

  public async updateFeaturedProject(id: string, featured: boolean) {
    this.loading = true;

    await this.db.update(`projects/${id}`, { featured })
      .then(() => this.cLog.log(`project is ${featured ? 'now featured' : 'no longer featured'}`))
      .catch(error => this.cLog.error(`Something went wrong updating project`, [error, id, featured]))
      .finally(() => this.loading = false)
  }

  public async deleteSelectedProjects() {
    this.loading = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: undefined,
      height: undefined,
      data: {
        title: 'Delete all selected projects?',
        description: 'All selected projects will be permanently deleted and cannot be undone'
      }
    });

    dialogRef.afterClosed().forEach(async _delete => {
      if (_delete) {
        const removedProjects: string[] = [];

        for (const project of this.selectionModel.selected) {
          await this.db.delete(`projects/${project.id}`)
            .then(() => {
              this.selectionModel.deselect(project);
              removedProjects.push(project.id);
            }).catch(error => this.cLog.error(`Something went wong deleting project`, error, project));
        }

        this.cLog.log(`removed ${removedProjects.length} ${removedProjects.length === 1 ? 'project' : 'projects'}`, removedProjects);
      }
      this.loading = false;
    });
  }

  public async publishSelectedProjects() {
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

      if (publishedProjects.length) this.cLog.log(`published ${publishedProjects.length == 1 ? 'project' : 'projects'}`);
    } catch (error) {
      this.cLog.error(`Something went wrong publishing projects`, error);
    } finally { this.loading = false; }
  }
  public async publishProject(id: string, notify = true) {
    this.loading = true;

    return await this.db.update(
      `projects/${id}`,
      {
        status: 'published',
        updated: this.db.timestamp
      }
    ).then(() => { if (notify) this.cLog.log(`published project`) })
      .catch(error => { if (notify) this.cLog.error(`Something went wong publishing project`, error, id) })
      .finally(() => this.loading = false);
  }

  public async deleteProject(id: string, notify = true) {

      this.loading = true;

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: undefined,
        height: undefined,
        data: {
          title: 'Delete this project?',
          description: 'This project will be permanently deleted and cannot be recovered.'
        }
      });

      dialogRef.afterClosed().forEach(async _delete => {
        if (_delete) {
          await this.db.delete(`projects/${id}`)
            .then(() => { if (notify) this.cLog.log(`Projetct deleted`) })
            .catch(error => { if (notify) this.cLog.error(`Something went wrong deleting project`, error, id) });
        }
        this.loading = false;
      });
  }

  public allDraftsSelected(): boolean {
    return this.selectionModel.selected.every(project => project.status != 'published');
  }
}
