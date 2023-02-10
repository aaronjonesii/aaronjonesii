import { Component } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { GenericItem } from "../../../shared/interfaces/generic-item";

@Component({
  selector: 'aj-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public readonly title = 'Admin';

  public readonly segments: GenericItem[] = [
    { name: 'Dashboard', icon: 'dashboard', routerLink: [nav_path.adminDashboard] },
    // { name: 'Projects', icon: 'supervised_user_circle', routerLink: ['/admin/projects'] },
    // { name: 'Comments', icon: 'work_history', routerLink: ['/admin/comments'] },
    // { name: 'Users', icon: 'contact_mail', routerLink: ['/admin/users'] },
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] }
  ];
}
