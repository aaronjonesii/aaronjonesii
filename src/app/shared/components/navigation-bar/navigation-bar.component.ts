import { Component, Input } from '@angular/core';
import { nav_path } from "../../../app.routes";
import { GenericItem } from "../../interfaces/generic-item";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'aj-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
})
export class NavigationBarComponent {
  @Input() segments: GenericItem[] = [
    { name: 'Home', icon: 'home', routerLink: [nav_path.home] },
    { name: 'About', icon: 'person', routerLink: [nav_path.about] },
    { name: 'Work', icon: 'work_history', routerLink: [nav_path.projects] },
    { name: 'Contact', icon: 'contact_support', routerLink: [nav_path.contact] }
  ];
}
