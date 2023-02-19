import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[ajFileDropzone]' })
export class FileDropzoneDirective {
  @Output() public dropped = new EventEmitter<FileList>();
  @Output() public hovered = new EventEmitter<boolean>();
  @Input() hoverClass = 'hovered';

  constructor(private elementRef: ElementRef) {}

  @HostListener('drop', ['$event'])
  public onDrop($event: DragEvent) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer?.files);
    this.onDragLeave($event);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.elementRef.nativeElement.classList.add(this.hoverClass);
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
    this.hovered.emit(false);
  }
}
