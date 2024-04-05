import { Component, Input } from '@angular/core';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'aj-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrl: './loading-or-error.component.scss',
  standalone: true,
  imports: [
    LoadingComponent,
  ],
})
export class LoadingOrErrorComponent {
  @Input() error?: Error;
}
