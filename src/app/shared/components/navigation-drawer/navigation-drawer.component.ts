import { Component, Input } from '@angular/core';
import { GenericItem } from "../../interfaces/generic-item";
import { nav_path } from "../../../app-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'aj-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrl: './navigation-drawer.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
})
export class NavigationDrawerComponent {
  @Input() segments: GenericItem[] = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.projects] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] },
  ];
}
