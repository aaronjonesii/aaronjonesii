import { Component, Input } from '@angular/core';

@Component({
  selector: 'aj-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss']
})
export class LoadingOrErrorComponent {
  @Input() error?: Error;
}
