import {
  Directive,
  ElementRef,
  HostListener, inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[ajHoverClass]',
  standalone: true,
})
export class HoverClassDirective {
  hoverClass = input<string>('');
  hoverClasses = input<string[]>([]);

  hoverAddClass = input<string>('');
  hoverAddClasses = input<string[]>([]);

  hoverRemoveClass = input<string>('');
  hoverRemoveClasses = input<string[]>([]);

  private elementRef = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverClass());
    this.elementRef.nativeElement.classList.add(...this.hoverClasses());
    this.elementRef.nativeElement.classList.add(this.hoverAddClass());
    this.elementRef.nativeElement.classList.add(...this.hoverAddClasses());
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass());
    this.elementRef.nativeElement.classList.remove(...this.hoverClasses());
    this.elementRef.nativeElement.classList.remove(this.hoverRemoveClass());
    this.elementRef.nativeElement.classList
      .remove(...this.hoverRemoveClasses());
  }
}
