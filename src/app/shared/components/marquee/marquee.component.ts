import {
  afterNextRender,
  AfterRenderPhase,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'aj-marquee',
  template: `
    <div #scrollingEl class="scroll-container">
      <ng-content />
    </div>
  `,
  styleUrl: './marquee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarqueeComponent {
  isVertical = input(false);
  scrollingEl = viewChild.required<ElementRef<HTMLDivElement>>('scrollingEl');

  constructor(private cdRef: ChangeDetectorRef) {
    afterNextRender(() => {
      const content = this.scrollingEl().nativeElement;
      const container = content.parentNode as HTMLDivElement;

      const clone = content.cloneNode(true) as HTMLDivElement;
      container.appendChild(clone);
    }, { phase: AfterRenderPhase.MixedReadWrite });
  }
}
