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
    { name: 'About', icon: 'supervised_user_circle', routerLink: ['/about'] },
    { name: 'Work', icon: 'work_history', routerLink: ['/work'] },
    { name: 'Contact', icon: 'contact_mail', routerLink: ['/contact'] }
  ];
}
