import { Component, Input } from '@angular/core';
import { GenericItem } from "../../interfaces/generic-item";
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-navigation-rail',
  templateUrl: './navigation-rail.component.html',
  styleUrls: ['./navigation-rail.component.scss']
})
export class NavigationRailComponent {
  @Input() segments: GenericItem[] = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.work] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] }
  ];
}
