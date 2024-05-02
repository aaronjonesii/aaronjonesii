import { Directive, HostListener, Input, Output, EventEmitter, } from '@angular/core';
import * as i0 from "@angular/core";
export class FileDropzoneDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        /**
         * Emits a FileList when files are dropped onto the host element.
         *
         * @event
         */
        this.dropped = new EventEmitter();
        /**
         * Emits a boolean indicating whether the host element is currently being hovered over
         * during a drag operation.
         *
         * @event
         */
        this.hovered = new EventEmitter();
        /**
         * The CSS class to apply to the host element when it's being hovered over.
         * Defaults to 'hovered'.
         */
        this.hoverClass = 'hovered';
    }
    /**
     * Handles the 'drop' event, emitting the dropped files and preventing default behavior.
     *
     * @param {$event} $event - The DragEvent containing the dropped files.
     */
    onDrop($event) {
        $event.preventDefault();
        this.dropped.emit($event.dataTransfer?.files);
        this.onDragLeave($event);
    }
    /**
     * Handles the 'dragover' event, adding a hover class and emitting a 'hovered' event
     * with a value of 'true'. Prevents default behavior.
     *
     * @param {$event} $event - The DragEvent.
     */
    onDragOver($event) {
        $event.preventDefault();
        this.elementRef.nativeElement.classList.add(this.hoverClass);
        this.hovered.emit(true);
    }
    /**
     * Handles the 'dragleave' event, removing the hover class and emitting
     * a 'hovered' event with a value of 'false'. Prevents default behavior.
     *
     * @param {$event} $event - The DragEvent.
     */
    onDragLeave($event) {
        $event.preventDefault();
        this.elementRef.nativeElement.classList.remove(this.hoverClass);
        this.hovered.emit(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FileDropzoneDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.3", type: FileDropzoneDirective, isStandalone: true, selector: "[anonFileDropzone]", inputs: { hoverClass: "hoverClass" }, outputs: { dropped: "dropped", hovered: "hovered" }, host: { listeners: { "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FileDropzoneDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[anonFileDropzone]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { dropped: [{
                type: Output
            }], hovered: [{
                type: Output
            }], hoverClass: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], onDragOver: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], onDragLeave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wem9uZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpcmViYXNlLXN0b3JhZ2UtbWFuYWdlci9zcmMvbGliL2RpcmVjdGl2ZXMvZmlsZS1kcm9wem9uZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDMUIsWUFBWSxHQUN6QixNQUFNLGVBQWUsQ0FBQzs7QUFNdkIsTUFBTSxPQUFPLHFCQUFxQjtJQW9CaEMsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQW5CMUM7Ozs7V0FJRztRQUNnQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMxRDs7Ozs7V0FLRztRQUNnQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN6RDs7O1dBR0c7UUFDTSxlQUFVLEdBQUcsU0FBUyxDQUFDO0lBRWEsQ0FBQztJQUU5Qzs7OztPQUlHO0lBRUgsTUFBTSxDQUFDLE1BQWlCO1FBQ3RCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBRUgsVUFBVSxDQUFDLE1BQWlCO1FBQzFCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFFSCxXQUFXLENBQUMsTUFBaUI7UUFDM0IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7OEdBMURVLHFCQUFxQjtrR0FBckIscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQUpqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjsrRUFPb0IsT0FBTztzQkFBekIsTUFBTTtnQkFPWSxPQUFPO3NCQUF6QixNQUFNO2dCQUtFLFVBQVU7c0JBQWxCLEtBQUs7Z0JBVU4sTUFBTTtzQkFETCxZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFjaEMsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFjcEMsV0FBVztzQkFEVixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYW5vbkZpbGVEcm9wem9uZV0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlRHJvcHpvbmVEaXJlY3RpdmUge1xuICAvKipcbiAgICogRW1pdHMgYSBGaWxlTGlzdCB3aGVuIGZpbGVzIGFyZSBkcm9wcGVkIG9udG8gdGhlIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogQGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUxpc3Q+KCk7XG4gIC8qKlxuICAgKiBFbWl0cyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBob3N0IGVsZW1lbnQgaXMgY3VycmVudGx5IGJlaW5nIGhvdmVyZWQgb3ZlclxuICAgKiBkdXJpbmcgYSBkcmFnIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaG92ZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgLyoqXG4gICAqIFRoZSBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gdGhlIGhvc3QgZWxlbWVudCB3aGVuIGl0J3MgYmVpbmcgaG92ZXJlZCBvdmVyLlxuICAgKiBEZWZhdWx0cyB0byAnaG92ZXJlZCcuXG4gICAqL1xuICBASW5wdXQoKSBob3ZlckNsYXNzID0gJ2hvdmVyZWQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgJ2Ryb3AnIGV2ZW50LCBlbWl0dGluZyB0aGUgZHJvcHBlZCBmaWxlcyBhbmQgcHJldmVudGluZyBkZWZhdWx0IGJlaGF2aW9yLlxuICAgKlxuICAgKiBAcGFyYW0geyRldmVudH0gJGV2ZW50IC0gVGhlIERyYWdFdmVudCBjb250YWluaW5nIHRoZSBkcm9wcGVkIGZpbGVzLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIG9uRHJvcCgkZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuZHJvcHBlZC5lbWl0KCRldmVudC5kYXRhVHJhbnNmZXI/LmZpbGVzKTtcbiAgICB0aGlzLm9uRHJhZ0xlYXZlKCRldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgJ2RyYWdvdmVyJyBldmVudCwgYWRkaW5nIGEgaG92ZXIgY2xhc3MgYW5kIGVtaXR0aW5nIGEgJ2hvdmVyZWQnIGV2ZW50XG4gICAqIHdpdGggYSB2YWx1ZSBvZiAndHJ1ZScuIFByZXZlbnRzIGRlZmF1bHQgYmVoYXZpb3IuXG4gICAqXG4gICAqIEBwYXJhbSB7JGV2ZW50fSAkZXZlbnQgLSBUaGUgRHJhZ0V2ZW50LlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBvbkRyYWdPdmVyKCRldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmhvdmVyQ2xhc3MpO1xuICAgIHRoaXMuaG92ZXJlZC5lbWl0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlICdkcmFnbGVhdmUnIGV2ZW50LCByZW1vdmluZyB0aGUgaG92ZXIgY2xhc3MgYW5kIGVtaXR0aW5nXG4gICAqIGEgJ2hvdmVyZWQnIGV2ZW50IHdpdGggYSB2YWx1ZSBvZiAnZmFsc2UnLiBQcmV2ZW50cyBkZWZhdWx0IGJlaGF2aW9yLlxuICAgKlxuICAgKiBAcGFyYW0geyRldmVudH0gJGV2ZW50IC0gVGhlIERyYWdFdmVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ0xlYXZlKCRldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmhvdmVyQ2xhc3MpO1xuICAgIHRoaXMuaG92ZXJlZC5lbWl0KGZhbHNlKTtcbiAgfVxufVxuIl19