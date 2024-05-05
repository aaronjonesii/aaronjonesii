import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class LoadingComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        /**
         * Configures the height of the loading SVG (in pixels). Defaults to 250px.
         */
        this.height = 250;
        /**
         * A dynamic SVG string representing the loading animation.
         * This string is generated using the provided height.
         * @private
         */
        /* eslint-disable-next-line max-len */
        this.LOADING_SVG = (height) => `<?xml version="1.0" encoding="utf-8"?><svg width='${height}px' height='${height}px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><defs><filter id="uil-ring-shadow" x="-100%" y="-100%" width="300%" height="300%"><feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="0"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter></defs><path d="M10,50c0,0,0,0.5,0.1,1.4c0,0.5,0.1,1,0.2,1.7c0,0.3,0.1,0.7,0.1,1.1c0.1,0.4,0.1,0.8,0.2,1.2c0.2,0.8,0.3,1.8,0.5,2.8 c0.3,1,0.6,2.1,0.9,3.2c0.3,1.1,0.9,2.3,1.4,3.5c0.5,1.2,1.2,2.4,1.8,3.7c0.3,0.6,0.8,1.2,1.2,1.9c0.4,0.6,0.8,1.3,1.3,1.9 c1,1.2,1.9,2.6,3.1,3.7c2.2,2.5,5,4.7,7.9,6.7c3,2,6.5,3.4,10.1,4.6c3.6,1.1,7.5,1.5,11.2,1.6c4-0.1,7.7-0.6,11.3-1.6 c3.6-1.2,7-2.6,10-4.6c3-2,5.8-4.2,7.9-6.7c1.2-1.2,2.1-2.5,3.1-3.7c0.5-0.6,0.9-1.3,1.3-1.9c0.4-0.6,0.8-1.3,1.2-1.9 c0.6-1.3,1.3-2.5,1.8-3.7c0.5-1.2,1-2.4,1.4-3.5c0.3-1.1,0.6-2.2,0.9-3.2c0.2-1,0.4-1.9,0.5-2.8c0.1-0.4,0.1-0.8,0.2-1.2 c0-0.4,0.1-0.7,0.1-1.1c0.1-0.7,0.1-1.2,0.2-1.7C90,50.5,90,50,90,50s0,0.5,0,1.4c0,0.5,0,1,0,1.7c0,0.3,0,0.7,0,1.1 c0,0.4-0.1,0.8-0.1,1.2c-0.1,0.9-0.2,1.8-0.4,2.8c-0.2,1-0.5,2.1-0.7,3.3c-0.3,1.2-0.8,2.4-1.2,3.7c-0.2,0.7-0.5,1.3-0.8,1.9 c-0.3,0.7-0.6,1.3-0.9,2c-0.3,0.7-0.7,1.3-1.1,2c-0.4,0.7-0.7,1.4-1.2,2c-1,1.3-1.9,2.7-3.1,4c-2.2,2.7-5,5-8.1,7.1 c-0.8,0.5-1.6,1-2.4,1.5c-0.8,0.5-1.7,0.9-2.6,1.3L66,87.7l-1.4,0.5c-0.9,0.3-1.8,0.7-2.8,1c-3.8,1.1-7.9,1.7-11.8,1.8L47,90.8 c-1,0-2-0.2-3-0.3l-1.5-0.2l-0.7-0.1L41.1,90c-1-0.3-1.9-0.5-2.9-0.7c-0.9-0.3-1.9-0.7-2.8-1L34,87.7l-1.3-0.6 c-0.9-0.4-1.8-0.8-2.6-1.3c-0.8-0.5-1.6-1-2.4-1.5c-3.1-2.1-5.9-4.5-8.1-7.1c-1.2-1.2-2.1-2.7-3.1-4c-0.5-0.6-0.8-1.4-1.2-2 c-0.4-0.7-0.8-1.3-1.1-2c-0.3-0.7-0.6-1.3-0.9-2c-0.3-0.7-0.6-1.3-0.8-1.9c-0.4-1.3-0.9-2.5-1.2-3.7c-0.3-1.2-0.5-2.3-0.7-3.3 c-0.2-1-0.3-2-0.4-2.8c-0.1-0.4-0.1-0.8-0.1-1.2c0-0.4,0-0.7,0-1.1c0-0.7,0-1.2,0-1.7C10,50.5,10,50,10,50z" fill="#337ab7" filter="url(#uil-ring-shadow)"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" dur="1s"></animateTransform></path></svg>`;
    }
    ngOnInit() {
        /**
         * Generating a SafeHtml version of the loading SVG using the provided
         * height.
         */
        if (this.height) {
            this.svg = this.sanitizer
                .bypassSecurityTrustHtml(this.LOADING_SVG(this.height));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: LoadingComponent, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.3", type: LoadingComponent, isStandalone: true, selector: "anon-loading", inputs: { height: "height" }, ngImport: i0, template: `
    <div class="loading">
      <div [style.height]="height+'px'" [innerHTML]="svg"></div>
    </div>`, isInline: true, styles: [".loading{display:flex;align-items:center;justify-content:center}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'anon-loading', template: `
    <div class="loading">
      <div [style.height]="height+'px'" [innerHTML]="svg"></div>
    </div>`, standalone: true, styles: [".loading{display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { height: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpcmViYXNlLXN0b3JhZ2UtbWFuYWdlci9zcmMvbGliL2NvbXBvbmVudHMvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7O0FBY3pELE1BQU0sT0FBTyxnQkFBZ0I7SUFvQjNCLFlBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFuQjNDOztXQUVHO1FBRUgsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUViOzs7O1dBSUc7UUFDSCxzQ0FBc0M7UUFDdEMsZ0JBQVcsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMscURBQXFELE1BQU0sZUFBZSxNQUFNLGdxRUFBZ3FFLENBQUM7SUFPcnVFLENBQUM7SUFFL0MsUUFBUTtRQUNOOzs7V0FHRztRQUNILElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVM7aUJBQ3RCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7OEdBL0JVLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLHNHQVRqQjs7O1dBR0Q7OzJGQU1FLGdCQUFnQjtrQkFYNUIsU0FBUzsrQkFDRSxjQUFjLFlBQ2Q7OztXQUdELGNBSUcsSUFBSTtpRkFPaEIsTUFBTTtzQkFETCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Fub24tbG9hZGluZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImxvYWRpbmdcIj5cbiAgICAgIDxkaXYgW3N0eWxlLmhlaWdodF09XCJoZWlnaHQrJ3B4J1wiIFtpbm5lckhUTUxdPVwic3ZnXCI+PC9kaXY+XG4gICAgPC9kaXY+YCxcbiAgc3R5bGVzOiBgXG4gICAgICAubG9hZGluZyB7ZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cbiAgYCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBoZWlnaHQgb2YgdGhlIGxvYWRpbmcgU1ZHIChpbiBwaXhlbHMpLiBEZWZhdWx0cyB0byAyNTBweC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGhlaWdodCA9IDI1MDtcblxuICAvKipcbiAgICogQSBkeW5hbWljIFNWRyBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBsb2FkaW5nIGFuaW1hdGlvbi5cbiAgICogVGhpcyBzdHJpbmcgaXMgZ2VuZXJhdGVkIHVzaW5nIHRoZSBwcm92aWRlZCBoZWlnaHQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlbiAqL1xuICBMT0FESU5HX1NWRyA9IChoZWlnaHQ6IG51bWJlcikgPT4gYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cInV0Zi04XCI/Pjxzdmcgd2lkdGg9JyR7aGVpZ2h0fXB4JyBoZWlnaHQ9JyR7aGVpZ2h0fXB4JyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkXCIgY2xhc3M9XCJ1aWwtcmluZ1wiPjxyZWN0IHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIGZpbGw9XCJub25lXCIgY2xhc3M9XCJia1wiPjwvcmVjdD48ZGVmcz48ZmlsdGVyIGlkPVwidWlsLXJpbmctc2hhZG93XCIgeD1cIi0xMDAlXCIgeT1cIi0xMDAlXCIgd2lkdGg9XCIzMDAlXCIgaGVpZ2h0PVwiMzAwJVwiPjxmZU9mZnNldCByZXN1bHQ9XCJvZmZPdXRcIiBpbj1cIlNvdXJjZUdyYXBoaWNcIiBkeD1cIjBcIiBkeT1cIjBcIj48L2ZlT2Zmc2V0PjxmZUdhdXNzaWFuQmx1ciByZXN1bHQ9XCJibHVyT3V0XCIgaW49XCJvZmZPdXRcIiBzdGREZXZpYXRpb249XCIwXCI+PC9mZUdhdXNzaWFuQmx1cj48ZmVCbGVuZCBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJibHVyT3V0XCIgbW9kZT1cIm5vcm1hbFwiPjwvZmVCbGVuZD48L2ZpbHRlcj48L2RlZnM+PHBhdGggZD1cIk0xMCw1MGMwLDAsMCwwLjUsMC4xLDEuNGMwLDAuNSwwLjEsMSwwLjIsMS43YzAsMC4zLDAuMSwwLjcsMC4xLDEuMWMwLjEsMC40LDAuMSwwLjgsMC4yLDEuMmMwLjIsMC44LDAuMywxLjgsMC41LDIuOCBjMC4zLDEsMC42LDIuMSwwLjksMy4yYzAuMywxLjEsMC45LDIuMywxLjQsMy41YzAuNSwxLjIsMS4yLDIuNCwxLjgsMy43YzAuMywwLjYsMC44LDEuMiwxLjIsMS45YzAuNCwwLjYsMC44LDEuMywxLjMsMS45IGMxLDEuMiwxLjksMi42LDMuMSwzLjdjMi4yLDIuNSw1LDQuNyw3LjksNi43YzMsMiw2LjUsMy40LDEwLjEsNC42YzMuNiwxLjEsNy41LDEuNSwxMS4yLDEuNmM0LTAuMSw3LjctMC42LDExLjMtMS42IGMzLjYtMS4yLDctMi42LDEwLTQuNmMzLTIsNS44LTQuMiw3LjktNi43YzEuMi0xLjIsMi4xLTIuNSwzLjEtMy43YzAuNS0wLjYsMC45LTEuMywxLjMtMS45YzAuNC0wLjYsMC44LTEuMywxLjItMS45IGMwLjYtMS4zLDEuMy0yLjUsMS44LTMuN2MwLjUtMS4yLDEtMi40LDEuNC0zLjVjMC4zLTEuMSwwLjYtMi4yLDAuOS0zLjJjMC4yLTEsMC40LTEuOSwwLjUtMi44YzAuMS0wLjQsMC4xLTAuOCwwLjItMS4yIGMwLTAuNCwwLjEtMC43LDAuMS0xLjFjMC4xLTAuNywwLjEtMS4yLDAuMi0xLjdDOTAsNTAuNSw5MCw1MCw5MCw1MHMwLDAuNSwwLDEuNGMwLDAuNSwwLDEsMCwxLjdjMCwwLjMsMCwwLjcsMCwxLjEgYzAsMC40LTAuMSwwLjgtMC4xLDEuMmMtMC4xLDAuOS0wLjIsMS44LTAuNCwyLjhjLTAuMiwxLTAuNSwyLjEtMC43LDMuM2MtMC4zLDEuMi0wLjgsMi40LTEuMiwzLjdjLTAuMiwwLjctMC41LDEuMy0wLjgsMS45IGMtMC4zLDAuNy0wLjYsMS4zLTAuOSwyYy0wLjMsMC43LTAuNywxLjMtMS4xLDJjLTAuNCwwLjctMC43LDEuNC0xLjIsMmMtMSwxLjMtMS45LDIuNy0zLjEsNGMtMi4yLDIuNy01LDUtOC4xLDcuMSBjLTAuOCwwLjUtMS42LDEtMi40LDEuNWMtMC44LDAuNS0xLjcsMC45LTIuNiwxLjNMNjYsODcuN2wtMS40LDAuNWMtMC45LDAuMy0xLjgsMC43LTIuOCwxYy0zLjgsMS4xLTcuOSwxLjctMTEuOCwxLjhMNDcsOTAuOCBjLTEsMC0yLTAuMi0zLTAuM2wtMS41LTAuMmwtMC43LTAuMUw0MS4xLDkwYy0xLTAuMy0xLjktMC41LTIuOS0wLjdjLTAuOS0wLjMtMS45LTAuNy0yLjgtMUwzNCw4Ny43bC0xLjMtMC42IGMtMC45LTAuNC0xLjgtMC44LTIuNi0xLjNjLTAuOC0wLjUtMS42LTEtMi40LTEuNWMtMy4xLTIuMS01LjktNC41LTguMS03LjFjLTEuMi0xLjItMi4xLTIuNy0zLjEtNGMtMC41LTAuNi0wLjgtMS40LTEuMi0yIGMtMC40LTAuNy0wLjgtMS4zLTEuMS0yYy0wLjMtMC43LTAuNi0xLjMtMC45LTJjLTAuMy0wLjctMC42LTEuMy0wLjgtMS45Yy0wLjQtMS4zLTAuOS0yLjUtMS4yLTMuN2MtMC4zLTEuMi0wLjUtMi4zLTAuNy0zLjMgYy0wLjItMS0wLjMtMi0wLjQtMi44Yy0wLjEtMC40LTAuMS0wLjgtMC4xLTEuMmMwLTAuNCwwLTAuNywwLTEuMWMwLTAuNywwLTEuMiwwLTEuN0MxMCw1MC41LDEwLDUwLDEwLDUwelwiIGZpbGw9XCIjMzM3YWI3XCIgZmlsdGVyPVwidXJsKCN1aWwtcmluZy1zaGFkb3cpXCI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT1cInRyYW5zZm9ybVwiIHR5cGU9XCJyb3RhdGVcIiBmcm9tPVwiMCA1MCA1MFwiIHRvPVwiMzYwIDUwIDUwXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgZHVyPVwiMXNcIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9wYXRoPjwvc3ZnPmA7XG5cbiAgLyoqXG4gICAqIEhvbGRzIGEgc2FuaXRpemVkIHZlcnNpb24gb2YgdGhlIGR5bmFtaWMgU1ZHLCByZWFkeSBmb3IgcmVuZGVyaW5nLlxuICAgKi9cbiAgc3ZnPzogU2FmZUh0bWw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0aW5nIGEgU2FmZUh0bWwgdmVyc2lvbiBvZiB0aGUgbG9hZGluZyBTVkcgdXNpbmcgdGhlIHByb3ZpZGVkXG4gICAgICogaGVpZ2h0LlxuICAgICAqL1xuICAgIGlmICh0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5zdmcgPSB0aGlzLnNhbml0aXplclxuICAgICAgICAuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy5MT0FESU5HX1NWRyh0aGlzLmhlaWdodCkpO1xuICAgIH1cbiAgfVxufVxuIl19