import { Component, Input } from '@angular/core';
import { GenericItem } from "../../interfaces/generic-item";
import { nav_path } from "../../../app.routes";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'aj-navigation-rail',
  templateUrl: './navigation-rail.component.html',
  styleUrl: './navigation-rail.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class NavigationRailComponent {
  @Input() segments: GenericItem[] = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.projects] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] },
  ];
}
