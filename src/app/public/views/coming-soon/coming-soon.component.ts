import { Component } from '@angular/core';
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent {
  public readonly nav_path = nav_path;
  public readonly name = 'Aaron Jones II';
  public readonly currentYear = new Date().getFullYear();
  public readonly github = 'https://github.com/aaronjonesii';
}
