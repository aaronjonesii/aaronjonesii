import { Component, Input } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { GenericItem } from "../../interfaces/generic-item";

@Component({
  selector: 'aj-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  @Input() segments: GenericItem[] = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.projects] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] }
  ];
}
