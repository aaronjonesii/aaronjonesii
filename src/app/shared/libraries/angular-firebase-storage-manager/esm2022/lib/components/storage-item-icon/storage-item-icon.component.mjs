import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/icon";
export class StorageItemIconComponent {
    constructor() {
        /**
         * The type of item to represent.
         * Can be either 'file' or 'folder'. Defaults to 'folder'.
         */
        this.type = 'folder';
        // This is copied as is from firebase-tools-ui
        // eslint-disable-next-line max-len
        // https://github.com/firebase/firebase-tools-ui/blob/8ad31d748f687bbb04b838430c460121f9a8e338/src/components/Storage/common/StorageFileIcon/StorageFileIcon.tsx
        /**
         * A mapping of MIME content types to Material Design icon names.
         * Used for determining specific icons for different file types.
         * @private
         */
        this.MIME_TYPE_ICON_MAP = {
            // pdf
            'application/pdf': 'picture_as_pdf',
            // images
            'image/gif': 'image',
            'image/jpg': 'image',
            'image/jpeg': 'image',
            'image/png': 'image',
            'image/svg+xml': 'image',
            'image/webp': 'image',
            // audio
            'audio/m4a': 'audio_file',
            'audio/mp3': 'audio_file',
            'audio/mpeg': 'audio_file',
            'audio/wav': 'audio_file',
            'audio/x-ms-wma': 'audio_file',
            // video
            'video/avi': 'video_file',
            'video/mp4': 'video_file',
            'video/mpeg': 'video_file',
            'video/quicktime': 'video_file',
            'video/x-ms-wmv': 'video_file',
            'video/x-matroska': 'video_file',
            'video/webp': 'video_file',
            // zip
            'application/zip': 'folder_zip',
            // text documents
            'text/javascript': 'javascript',
            'text/plain': 'text_snippet',
        };
        /**
         * A default Material Design icon name used when a specific
         * content type match is not found.
         * @private
         */
        this.DEFAULT_MIME_TYPE_ICON = 'file_present';
    }
    /**
     * Determines the appropriate Material Design icon name based on
     * the provided content type or a default.
     *
     * @param {string} contentType - The MIME content type of the file (optional).
     * @returns {string} The name of the Material Design icon to use.
     */
    getFileIcon(contentType) {
        if (!contentType)
            return this.DEFAULT_MIME_TYPE_ICON;
        return this.MIME_TYPE_ICON_MAP[contentType] || this.DEFAULT_MIME_TYPE_ICON;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: StorageItemIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.3", type: StorageItemIconComponent, isStandalone: true, selector: "anon-storage-item-icon", inputs: { type: "type", contentType: "contentType" }, ngImport: i0, template: "@if (type === 'folder') {\n  <mat-icon class=\"material-icons-round\" fontIcon=\"folder\" />\n} @else {\n  <!-- eslint-disable-next-line @angular-eslint/template/no-call-expression -->\n  <mat-icon class=\"material-icons-round\" [fontIcon]=\"getFileIcon(contentType)\" />\n}\n", styles: ["mat-icon{color:#0000008a;margin-right:.25rem}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: StorageItemIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'anon-storage-item-icon', standalone: true, imports: [MatIconModule], template: "@if (type === 'folder') {\n  <mat-icon class=\"material-icons-round\" fontIcon=\"folder\" />\n} @else {\n  <!-- eslint-disable-next-line @angular-eslint/template/no-call-expression -->\n  <mat-icon class=\"material-icons-round\" [fontIcon]=\"getFileIcon(contentType)\" />\n}\n", styles: ["mat-icon{color:#0000008a;margin-right:.25rem}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], contentType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1pdGVtLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1maXJlYmFzZS1zdG9yYWdlLW1hbmFnZXIvc3JjL2xpYi9jb21wb25lbnRzL3N0b3JhZ2UtaXRlbS1pY29uL3N0b3JhZ2UtaXRlbS1pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlyZWJhc2Utc3RvcmFnZS1tYW5hZ2VyL3NyYy9saWIvY29tcG9uZW50cy9zdG9yYWdlLWl0ZW0taWNvbi9zdG9yYWdlLWl0ZW0taWNvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQVN2RCxNQUFNLE9BQU8sd0JBQXdCO0lBUHJDO1FBUUU7OztXQUdHO1FBRUgsU0FBSSxHQUFzQixRQUFRLENBQUM7UUFTbkMsOENBQThDO1FBQzlDLG1DQUFtQztRQUNuQyxnS0FBZ0s7UUFDaEs7Ozs7V0FJRztRQUNjLHVCQUFrQixHQUEyQjtZQUM1RCxNQUFNO1lBQ04saUJBQWlCLEVBQUUsZ0JBQWdCO1lBQ25DLFNBQVM7WUFDVCxXQUFXLEVBQUUsT0FBTztZQUNwQixXQUFXLEVBQUUsT0FBTztZQUNwQixZQUFZLEVBQUUsT0FBTztZQUNyQixXQUFXLEVBQUUsT0FBTztZQUNwQixlQUFlLEVBQUUsT0FBTztZQUN4QixZQUFZLEVBQUUsT0FBTztZQUNyQixRQUFRO1lBQ1IsV0FBVyxFQUFFLFlBQVk7WUFDekIsV0FBVyxFQUFFLFlBQVk7WUFDekIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLFlBQVk7WUFDekIsZ0JBQWdCLEVBQUUsWUFBWTtZQUM5QixRQUFRO1lBQ1IsV0FBVyxFQUFFLFlBQVk7WUFDekIsV0FBVyxFQUFFLFlBQVk7WUFDekIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixnQkFBZ0IsRUFBRSxZQUFZO1lBQzlCLGtCQUFrQixFQUFFLFlBQVk7WUFDaEMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsTUFBTTtZQUNOLGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsaUJBQWlCO1lBQ2pCLGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsWUFBWSxFQUFFLGNBQWM7U0FDcEIsQ0FBQztRQUNYOzs7O1dBSUc7UUFDYywyQkFBc0IsR0FBRyxjQUFjLENBQUM7S0FjMUQ7SUFaQzs7Ozs7O09BTUc7SUFDSCxXQUFXLENBQUMsV0FBb0I7UUFDOUIsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztRQUVyRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDN0UsQ0FBQzs4R0F2RVUsd0JBQXdCO2tHQUF4Qix3QkFBd0Isd0lDVnJDLHNSQU1BLHdHREVZLGFBQWE7OzJGQUVaLHdCQUF3QjtrQkFQcEMsU0FBUzsrQkFDRSx3QkFBd0IsY0FHdEIsSUFBSSxXQUNQLENBQUMsYUFBYSxDQUFDOzhCQVF4QixJQUFJO3NCQURILEtBQUs7Z0JBUU4sV0FBVztzQkFEVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9pY29uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fub24tc3RvcmFnZS1pdGVtLWljb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RvcmFnZS1pdGVtLWljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vc3RvcmFnZS1pdGVtLWljb24uY29tcG9uZW50LnNjc3MnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTWF0SWNvbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VJdGVtSWNvbkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiBpdGVtIHRvIHJlcHJlc2VudC5cbiAgICogQ2FuIGJlIGVpdGhlciAnZmlsZScgb3IgJ2ZvbGRlcicuIERlZmF1bHRzIHRvICdmb2xkZXInLlxuICAgKi9cbiAgQElucHV0KClcbiAgdHlwZTogJ2ZpbGUnIHwgJ2ZvbGRlcicgPSAnZm9sZGVyJztcblxuICAvKipcbiAgICogVGhlIE1JTUUgY29udGVudCB0eXBlIG9mIGEgZmlsZSBpdGVtIChvcHRpb25hbCkuXG4gICAqIFVzZWQgZm9yIG1vcmUgc3BlY2lmaWMgaWNvbiBzZWxlY3Rpb24uXG4gICAqL1xuICBASW5wdXQoKVxuICBjb250ZW50VHlwZT86IHN0cmluZztcblxuICAvLyBUaGlzIGlzIGNvcGllZCBhcyBpcyBmcm9tIGZpcmViYXNlLXRvb2xzLXVpXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9maXJlYmFzZS9maXJlYmFzZS10b29scy11aS9ibG9iLzhhZDMxZDc0OGY2ODdiYmIwNGI4Mzg0MzBjNDYwMTIxZjlhOGUzMzgvc3JjL2NvbXBvbmVudHMvU3RvcmFnZS9jb21tb24vU3RvcmFnZUZpbGVJY29uL1N0b3JhZ2VGaWxlSWNvbi50c3hcbiAgLyoqXG4gICAqIEEgbWFwcGluZyBvZiBNSU1FIGNvbnRlbnQgdHlwZXMgdG8gTWF0ZXJpYWwgRGVzaWduIGljb24gbmFtZXMuXG4gICAqIFVzZWQgZm9yIGRldGVybWluaW5nIHNwZWNpZmljIGljb25zIGZvciBkaWZmZXJlbnQgZmlsZSB0eXBlcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgTUlNRV9UWVBFX0lDT05fTUFQOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIC8vIHBkZlxuICAgICdhcHBsaWNhdGlvbi9wZGYnOiAncGljdHVyZV9hc19wZGYnLFxuICAgIC8vIGltYWdlc1xuICAgICdpbWFnZS9naWYnOiAnaW1hZ2UnLFxuICAgICdpbWFnZS9qcGcnOiAnaW1hZ2UnLFxuICAgICdpbWFnZS9qcGVnJzogJ2ltYWdlJyxcbiAgICAnaW1hZ2UvcG5nJzogJ2ltYWdlJyxcbiAgICAnaW1hZ2Uvc3ZnK3htbCc6ICdpbWFnZScsXG4gICAgJ2ltYWdlL3dlYnAnOiAnaW1hZ2UnLFxuICAgIC8vIGF1ZGlvXG4gICAgJ2F1ZGlvL200YSc6ICdhdWRpb19maWxlJyxcbiAgICAnYXVkaW8vbXAzJzogJ2F1ZGlvX2ZpbGUnLFxuICAgICdhdWRpby9tcGVnJzogJ2F1ZGlvX2ZpbGUnLFxuICAgICdhdWRpby93YXYnOiAnYXVkaW9fZmlsZScsXG4gICAgJ2F1ZGlvL3gtbXMtd21hJzogJ2F1ZGlvX2ZpbGUnLFxuICAgIC8vIHZpZGVvXG4gICAgJ3ZpZGVvL2F2aSc6ICd2aWRlb19maWxlJyxcbiAgICAndmlkZW8vbXA0JzogJ3ZpZGVvX2ZpbGUnLFxuICAgICd2aWRlby9tcGVnJzogJ3ZpZGVvX2ZpbGUnLFxuICAgICd2aWRlby9xdWlja3RpbWUnOiAndmlkZW9fZmlsZScsXG4gICAgJ3ZpZGVvL3gtbXMtd212JzogJ3ZpZGVvX2ZpbGUnLFxuICAgICd2aWRlby94LW1hdHJvc2thJzogJ3ZpZGVvX2ZpbGUnLFxuICAgICd2aWRlby93ZWJwJzogJ3ZpZGVvX2ZpbGUnLFxuICAgIC8vIHppcFxuICAgICdhcHBsaWNhdGlvbi96aXAnOiAnZm9sZGVyX3ppcCcsXG4gICAgLy8gdGV4dCBkb2N1bWVudHNcbiAgICAndGV4dC9qYXZhc2NyaXB0JzogJ2phdmFzY3JpcHQnLFxuICAgICd0ZXh0L3BsYWluJzogJ3RleHRfc25pcHBldCcsXG4gIH0gYXMgY29uc3Q7XG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgTWF0ZXJpYWwgRGVzaWduIGljb24gbmFtZSB1c2VkIHdoZW4gYSBzcGVjaWZpY1xuICAgKiBjb250ZW50IHR5cGUgbWF0Y2ggaXMgbm90IGZvdW5kLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBERUZBVUxUX01JTUVfVFlQRV9JQ09OID0gJ2ZpbGVfcHJlc2VudCc7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIGFwcHJvcHJpYXRlIE1hdGVyaWFsIERlc2lnbiBpY29uIG5hbWUgYmFzZWQgb25cbiAgICogdGhlIHByb3ZpZGVkIGNvbnRlbnQgdHlwZSBvciBhIGRlZmF1bHQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50VHlwZSAtIFRoZSBNSU1FIGNvbnRlbnQgdHlwZSBvZiB0aGUgZmlsZSAob3B0aW9uYWwpLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgTWF0ZXJpYWwgRGVzaWduIGljb24gdG8gdXNlLlxuICAgKi9cbiAgZ2V0RmlsZUljb24oY29udGVudFR5cGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghY29udGVudFR5cGUpIHJldHVybiB0aGlzLkRFRkFVTFRfTUlNRV9UWVBFX0lDT047XG5cbiAgICByZXR1cm4gdGhpcy5NSU1FX1RZUEVfSUNPTl9NQVBbY29udGVudFR5cGVdIHx8IHRoaXMuREVGQVVMVF9NSU1FX1RZUEVfSUNPTjtcbiAgfVxufVxuIiwiQGlmICh0eXBlID09PSAnZm9sZGVyJykge1xuICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiIGZvbnRJY29uPVwiZm9sZGVyXCIgLz5cbn0gQGVsc2Uge1xuICA8IS0tIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvdGVtcGxhdGUvbm8tY2FsbC1leHByZXNzaW9uIC0tPlxuICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiIFtmb250SWNvbl09XCJnZXRGaWxlSWNvbihjb250ZW50VHlwZSlcIiAvPlxufVxuIl19