import { Component, Input } from '@angular/core';
import { GenericItem } from "../../interfaces/generic-item";
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss']
})
export class NavigationDrawerComponent {
  @Input() segments: GenericItem[] = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.projects] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] },
  ];
}
