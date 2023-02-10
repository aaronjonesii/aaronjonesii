import { Component } from '@angular/core';
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  public readonly segments = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'supervised_user_circle', routerLink: ['/about'] },
    { name: 'Work', icon: 'work_history', routerLink: ['/work'] },
    { name: 'Contact', icon: 'contact_mail', routerLink: ['/contact'] }
  ];
}
