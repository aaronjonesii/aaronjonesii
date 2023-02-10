import { Injectable } from '@angular/core';
import { nav_path } from "../../app-routing.module";
import { GenericItem } from "../interfaces/generic-item";

@Injectable({ providedIn: 'root' })
export class MenuService {
  public readonly navigationBarMenu = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    // { name: 'About', icon: 'supervised_user_circle', routerLink: ['/about'] },
    // { name: 'Work', icon: 'work_history', routerLink: ['/work'] },
    // { name: 'Contact', icon: 'contact_mail', routerLink: ['/contact'] }
  ];

  public readonly adminMenu: GenericItem[] = [
    { name: 'Dashboard', icon: 'space_dashboard', routerLink: [nav_path.admin],
      description: 'Manage admin components throughout this website.' },
    // { name: 'Projects', description: 'Create and manage the projects displayed here.',
    //   routerLink: ['/admin/projects'], tooltip: 'Products', icon: 'work_history' },
    // { name: 'Comments', icon: 'comment', routerLink: ['/admin/comments'],
    //   description: 'Manage story comments.' },
    // { name: 'Customers', description: 'Manage this websites customers.',
    //   routerLink: ['/admin/users'], tooltip: 'Customers', icon: 'manage_accounts' },
  ]
}
