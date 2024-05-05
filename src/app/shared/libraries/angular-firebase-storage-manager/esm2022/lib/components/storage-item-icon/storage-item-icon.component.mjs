import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
     * @return {string} The name of the Material Design icon to use.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1pdGVtLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1maXJlYmFzZS1zdG9yYWdlLW1hbmFnZXIvc3JjL2xpYi9jb21wb25lbnRzL3N0b3JhZ2UtaXRlbS1pY29uL3N0b3JhZ2UtaXRlbS1pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlyZWJhc2Utc3RvcmFnZS1tYW5hZ2VyL3NyYy9saWIvY29tcG9uZW50cy9zdG9yYWdlLWl0ZW0taWNvbi9zdG9yYWdlLWl0ZW0taWNvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQVN2RCxNQUFNLE9BQU8sd0JBQXdCO0lBUHJDO1FBUUU7OztXQUdHO1FBRUgsU0FBSSxHQUFzQixRQUFRLENBQUM7UUFTbkMsOENBQThDO1FBQzlDLG1DQUFtQztRQUNuQyxnS0FBZ0s7UUFDaEs7Ozs7V0FJRztRQUNjLHVCQUFrQixHQUEyQjtZQUM1RCxNQUFNO1lBQ04saUJBQWlCLEVBQUUsZ0JBQWdCO1lBQ25DLFNBQVM7WUFDVCxXQUFXLEVBQUUsT0FBTztZQUNwQixXQUFXLEVBQUUsT0FBTztZQUNwQixZQUFZLEVBQUUsT0FBTztZQUNyQixXQUFXLEVBQUUsT0FBTztZQUNwQixlQUFlLEVBQUUsT0FBTztZQUN4QixZQUFZLEVBQUUsT0FBTztZQUNyQixRQUFRO1lBQ1IsV0FBVyxFQUFFLFlBQVk7WUFDekIsV0FBVyxFQUFFLFlBQVk7WUFDekIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLFlBQVk7WUFDekIsZ0JBQWdCLEVBQUUsWUFBWTtZQUM5QixRQUFRO1lBQ1IsV0FBVyxFQUFFLFlBQVk7WUFDekIsV0FBVyxFQUFFLFlBQVk7WUFDekIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixnQkFBZ0IsRUFBRSxZQUFZO1lBQzlCLGtCQUFrQixFQUFFLFlBQVk7WUFDaEMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsTUFBTTtZQUNOLGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsaUJBQWlCO1lBQ2pCLGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsWUFBWSxFQUFFLGNBQWM7U0FDcEIsQ0FBQztRQUNYOzs7O1dBSUc7UUFDYywyQkFBc0IsR0FBRyxjQUFjLENBQUM7S0FjMUQ7SUFaQzs7Ozs7O09BTUc7SUFDSCxXQUFXLENBQUMsV0FBb0I7UUFDOUIsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztRQUVyRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDN0UsQ0FBQzs4R0F2RVUsd0JBQXdCO2tHQUF4Qix3QkFBd0Isd0lDVnJDLHNSQU1BLHdHREVZLGFBQWE7OzJGQUVaLHdCQUF3QjtrQkFQcEMsU0FBUzsrQkFDRSx3QkFBd0IsY0FHdEIsSUFBSSxXQUNQLENBQUMsYUFBYSxDQUFDOzhCQVF4QixJQUFJO3NCQURILEtBQUs7Z0JBUU4sV0FBVztzQkFEVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbm9uLXN0b3JhZ2UtaXRlbS1pY29uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N0b3JhZ2UtaXRlbS1pY29uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3N0b3JhZ2UtaXRlbS1pY29uLmNvbXBvbmVudC5zY3NzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW01hdEljb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTdG9yYWdlSXRlbUljb25Db21wb25lbnQge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgaXRlbSB0byByZXByZXNlbnQuXG4gICAqIENhbiBiZSBlaXRoZXIgJ2ZpbGUnIG9yICdmb2xkZXInLiBEZWZhdWx0cyB0byAnZm9sZGVyJy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHR5cGU6ICdmaWxlJyB8ICdmb2xkZXInID0gJ2ZvbGRlcic7XG5cbiAgLyoqXG4gICAqIFRoZSBNSU1FIGNvbnRlbnQgdHlwZSBvZiBhIGZpbGUgaXRlbSAob3B0aW9uYWwpLlxuICAgKiBVc2VkIGZvciBtb3JlIHNwZWNpZmljIGljb24gc2VsZWN0aW9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgY29udGVudFR5cGU/OiBzdHJpbmc7XG5cbiAgLy8gVGhpcyBpcyBjb3BpZWQgYXMgaXMgZnJvbSBmaXJlYmFzZS10b29scy11aVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmlyZWJhc2UvZmlyZWJhc2UtdG9vbHMtdWkvYmxvYi84YWQzMWQ3NDhmNjg3YmJiMDRiODM4NDMwYzQ2MDEyMWY5YThlMzM4L3NyYy9jb21wb25lbnRzL1N0b3JhZ2UvY29tbW9uL1N0b3JhZ2VGaWxlSWNvbi9TdG9yYWdlRmlsZUljb24udHN4XG4gIC8qKlxuICAgKiBBIG1hcHBpbmcgb2YgTUlNRSBjb250ZW50IHR5cGVzIHRvIE1hdGVyaWFsIERlc2lnbiBpY29uIG5hbWVzLlxuICAgKiBVc2VkIGZvciBkZXRlcm1pbmluZyBzcGVjaWZpYyBpY29ucyBmb3IgZGlmZmVyZW50IGZpbGUgdHlwZXMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IE1JTUVfVFlQRV9JQ09OX01BUDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAvLyBwZGZcbiAgICAnYXBwbGljYXRpb24vcGRmJzogJ3BpY3R1cmVfYXNfcGRmJyxcbiAgICAvLyBpbWFnZXNcbiAgICAnaW1hZ2UvZ2lmJzogJ2ltYWdlJyxcbiAgICAnaW1hZ2UvanBnJzogJ2ltYWdlJyxcbiAgICAnaW1hZ2UvanBlZyc6ICdpbWFnZScsXG4gICAgJ2ltYWdlL3BuZyc6ICdpbWFnZScsXG4gICAgJ2ltYWdlL3N2Zyt4bWwnOiAnaW1hZ2UnLFxuICAgICdpbWFnZS93ZWJwJzogJ2ltYWdlJyxcbiAgICAvLyBhdWRpb1xuICAgICdhdWRpby9tNGEnOiAnYXVkaW9fZmlsZScsXG4gICAgJ2F1ZGlvL21wMyc6ICdhdWRpb19maWxlJyxcbiAgICAnYXVkaW8vbXBlZyc6ICdhdWRpb19maWxlJyxcbiAgICAnYXVkaW8vd2F2JzogJ2F1ZGlvX2ZpbGUnLFxuICAgICdhdWRpby94LW1zLXdtYSc6ICdhdWRpb19maWxlJyxcbiAgICAvLyB2aWRlb1xuICAgICd2aWRlby9hdmknOiAndmlkZW9fZmlsZScsXG4gICAgJ3ZpZGVvL21wNCc6ICd2aWRlb19maWxlJyxcbiAgICAndmlkZW8vbXBlZyc6ICd2aWRlb19maWxlJyxcbiAgICAndmlkZW8vcXVpY2t0aW1lJzogJ3ZpZGVvX2ZpbGUnLFxuICAgICd2aWRlby94LW1zLXdtdic6ICd2aWRlb19maWxlJyxcbiAgICAndmlkZW8veC1tYXRyb3NrYSc6ICd2aWRlb19maWxlJyxcbiAgICAndmlkZW8vd2VicCc6ICd2aWRlb19maWxlJyxcbiAgICAvLyB6aXBcbiAgICAnYXBwbGljYXRpb24vemlwJzogJ2ZvbGRlcl96aXAnLFxuICAgIC8vIHRleHQgZG9jdW1lbnRzXG4gICAgJ3RleHQvamF2YXNjcmlwdCc6ICdqYXZhc2NyaXB0JyxcbiAgICAndGV4dC9wbGFpbic6ICd0ZXh0X3NuaXBwZXQnLFxuICB9IGFzIGNvbnN0O1xuICAvKipcbiAgICogQSBkZWZhdWx0IE1hdGVyaWFsIERlc2lnbiBpY29uIG5hbWUgdXNlZCB3aGVuIGEgc3BlY2lmaWNcbiAgICogY29udGVudCB0eXBlIG1hdGNoIGlzIG5vdCBmb3VuZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgREVGQVVMVF9NSU1FX1RZUEVfSUNPTiA9ICdmaWxlX3ByZXNlbnQnO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHRoZSBhcHByb3ByaWF0ZSBNYXRlcmlhbCBEZXNpZ24gaWNvbiBuYW1lIGJhc2VkIG9uXG4gICAqIHRoZSBwcm92aWRlZCBjb250ZW50IHR5cGUgb3IgYSBkZWZhdWx0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFR5cGUgLSBUaGUgTUlNRSBjb250ZW50IHR5cGUgb2YgdGhlIGZpbGUgKG9wdGlvbmFsKS5cbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgTWF0ZXJpYWwgRGVzaWduIGljb24gdG8gdXNlLlxuICAgKi9cbiAgZ2V0RmlsZUljb24oY29udGVudFR5cGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICghY29udGVudFR5cGUpIHJldHVybiB0aGlzLkRFRkFVTFRfTUlNRV9UWVBFX0lDT047XG5cbiAgICByZXR1cm4gdGhpcy5NSU1FX1RZUEVfSUNPTl9NQVBbY29udGVudFR5cGVdIHx8IHRoaXMuREVGQVVMVF9NSU1FX1RZUEVfSUNPTjtcbiAgfVxufVxuIiwiQGlmICh0eXBlID09PSAnZm9sZGVyJykge1xuICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiIGZvbnRJY29uPVwiZm9sZGVyXCIgLz5cbn0gQGVsc2Uge1xuICA8IS0tIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvdGVtcGxhdGUvbm8tY2FsbC1leHByZXNzaW9uIC0tPlxuICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiIFtmb250SWNvbl09XCJnZXRGaWxlSWNvbihjb250ZW50VHlwZSlcIiAvPlxufVxuIl19