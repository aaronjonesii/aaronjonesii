import { Injectable } from '@angular/core';
import { nav_path } from "../../app-routing.module";
import { GenericItem } from "../interfaces/generic-item";

@Injectable({ providedIn: 'root' })
export class MenuService {
  public readonly navigationBarMenu = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.work] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] }
  ];

  public readonly adminNavigationBarMenu = [
    { name: 'Dashboard', icon: 'dashboard', routerLink: [nav_path.adminDashboard] },
    { name: 'Files', icon: 'snippet_folder', routerLink: [nav_path.adminFileManager] },
    { name: 'Projects', icon: 'supervised_user_circle', routerLink: ['/admin/projects'] },
    // { name: 'Comments', icon: 'work_history', routerLink: ['/admin/comments'] },
    { name: 'Users', icon: 'contact_mail', routerLink: [nav_path.adminUsers] },
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] }
  ];

  public readonly adminMenu: GenericItem[] = [
    { name: 'Dashboard', icon: 'space_dashboard', routerLink: [nav_path.admin],
      description: 'Manage admin components throughout this website.' },
    { name: 'Files', icon: 'snippet_folder', routerLink: [nav_path.adminFileManager],
      description: 'Manage files used throughout the website.' },
    { name: 'Projects', description: 'Create and manage the projects displayed here.',
      routerLink: ['/admin/projects'], tooltip: 'Projects', icon: 'work_history' },
    // { name: 'Comments', icon: 'comment', routerLink: ['/admin/comments'],
    //   description: 'Manage story comments.' },
    { name: 'Users', description: 'Manage this websites users.',
      routerLink: [nav_path.adminUsers], tooltip: 'Users', icon: 'manage_accounts' },
  ]
}
