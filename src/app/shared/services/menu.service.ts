import { Injectable } from '@angular/core';
import { navPath } from '../../app.routes';
import { GenericItem } from '../interfaces/generic-item';

@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly pages: GenericItem[] = [
    { id: 'home', name: 'Home', icon: 'home', routerLink: [navPath.home] },
    { id: 'about', name: 'About', icon: 'person', routerLink: [navPath.about] },
    {
      id: 'projects', name: 'Projects',
      icon: 'work_history', routerLink: [navPath.projects],
    },
    {
      id: 'contact', name: 'Contact',
      icon: 'contact_support', routerLink: [navPath.contact],
    },
  ];
  readonly adminPages: GenericItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'space_dashboard',
      routerLink: [navPath.adminDashboard],
      description: 'Manage admin components throughout this website.',
    },
    {
      id: 'files',
      name: 'Files',
      icon: 'snippet_folder',
      routerLink: [navPath.adminFileManager],
      description: 'Manage files used throughout the website.',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: 'work_history',
      description: 'Create and manage the projects displayed here.',
      routerLink: ['/admin/projects'],
      tooltip: 'Projects',
    },
    {
      id: 'users',
      name: 'Users',
      icon: 'manage_accounts',
      description: 'Manage this websites users.',
      routerLink: [navPath.adminUsers],
      tooltip: 'Users',
    },
  ];
}
