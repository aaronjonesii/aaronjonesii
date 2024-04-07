import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ajFileDropzone]',
  standalone: true,
})
export class FileDropzoneDirective {
  @Output() readonly dropped = new EventEmitter<FileList>();
  @Output() readonly hovered = new EventEmitter<boolean>();
  @Input() hoverClass = 'hovered';

  constructor(private elementRef: ElementRef) {}

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer?.files);
    this.onDragLeave($event);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.elementRef.nativeElement.classList.add(this.hoverClass);
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
    this.hovered.emit(false);
  }
}
