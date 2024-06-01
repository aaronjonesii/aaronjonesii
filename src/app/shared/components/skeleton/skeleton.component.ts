import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'aj-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgStyle],
})
export class SkeletonComponent implements OnInit {
  @Input()
  /** More details in https://angular.io/api/common/NgStyle */
  styles: { [k: string]: unknown; } | null = null;

  @Input()
  ariaLabel: string = 'loading';

  @Input()
  appearance: 'circle' | 'line' | 'custom-content' | '' = 'line';

  @Input()
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' | false =
    'progress';

  @Input()
  loadingText: string = 'Loading...';

  @Input()
  /** More details in https://angular.io/api/common/NgClass */
  classes: { [k: string]: unknown; } | null = null;

  ngOnInit() {
    this.classes = Object.assign({
      'custom-content': this.appearance === 'custom-content',
      'circle': this.appearance === 'circle',
      'progress': this.animation === 'progress',
      'progress-dark': this.animation === 'progress-dark',
      'pulse': this.animation === 'pulse',
    }, this.classes ?? {});
  }
}
