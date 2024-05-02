import { Component, Input } from '@angular/core';
import { LoadingComponent } from "../loading/loading.component";
import * as i0 from "@angular/core";
export class LoadingOrErrorComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: LoadingOrErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.3", type: LoadingOrErrorComponent, isStandalone: true, selector: "anon-loading-or-error", inputs: { error: "error" }, ngImport: i0, template: "@if (error) {\n  <div class=\"error\">\n    <h2>Error!</h2>\n    <p>\n      @if (error.message) {\n        {{error.message}}\n      } @else {\n        Something weird happened. Keep calm and try again later.\n      }\n    </p>\n  </div>\n} @else {\n  <anon-loading [height]=\"250\" />\n}\n", styles: ["div.error{color:#b3261e;margin:2rem;padding:2rem;text-align:center;border:1px dashed currentColor;border-radius:2rem}div.error h2{font-size:2rem}div.error p{margin-top:.25rem;font-size:1rem;color:initial}\n"], dependencies: [{ kind: "component", type: LoadingComponent, selector: "anon-loading", inputs: ["height"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: LoadingOrErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'anon-loading-or-error', standalone: true, imports: [LoadingComponent], template: "@if (error) {\n  <div class=\"error\">\n    <h2>Error!</h2>\n    <p>\n      @if (error.message) {\n        {{error.message}}\n      } @else {\n        Something weird happened. Keep calm and try again later.\n      }\n    </p>\n  </div>\n} @else {\n  <anon-loading [height]=\"250\" />\n}\n", styles: ["div.error{color:#b3261e;margin:2rem;padding:2rem;text-align:center;border:1px dashed currentColor;border-radius:2rem}div.error h2{font-size:2rem}div.error p{margin-top:.25rem;font-size:1rem;color:initial}\n"] }]
        }], propDecorators: { error: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1vci1lcnJvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpcmViYXNlLXN0b3JhZ2UtbWFuYWdlci9zcmMvbGliL2NvbXBvbmVudHMvbG9hZGluZy1vci1lcnJvci9sb2FkaW5nLW9yLWVycm9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlyZWJhc2Utc3RvcmFnZS1tYW5hZ2VyL3NyYy9saWIvY29tcG9uZW50cy9sb2FkaW5nLW9yLWVycm9yL2xvYWRpbmctb3ItZXJyb3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBU2hFLE1BQU0sT0FBTyx1QkFBdUI7OEdBQXZCLHVCQUF1QjtrR0FBdkIsdUJBQXVCLDZHQ1ZwQyxtU0FjQSx3UUROWSxnQkFBZ0I7OzJGQUVmLHVCQUF1QjtrQkFQbkMsU0FBUzsrQkFDRSx1QkFBdUIsY0FHckIsSUFBSSxXQUNQLENBQUMsZ0JBQWdCLENBQUM7OEJBT2xCLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tIFwiLi4vbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbm9uLWxvYWRpbmctb3ItZXJyb3InLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9hZGluZy1vci1lcnJvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9sb2FkaW5nLW9yLWVycm9yLmNvbXBvbmVudC5zY3NzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0xvYWRpbmdDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBMb2FkaW5nT3JFcnJvckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBFcnJvciBvYmplY3QgdG8gZGlzcGxheS4gSWYgcHJvdmlkZWQsIHRoZSBjb21wb25lbnQgd2lsbCByZW5kZXJcbiAgICogYW4gZXJyb3IgZGlzcGxheSBpbnN0ZWFkIG9mIGEgbG9hZGluZyBpbmRpY2F0b3IuXG4gICAqL1xuICBASW5wdXQoKSBlcnJvcj86IEVycm9yO1xufVxuIiwiQGlmIChlcnJvcikge1xuICA8ZGl2IGNsYXNzPVwiZXJyb3JcIj5cbiAgICA8aDI+RXJyb3IhPC9oMj5cbiAgICA8cD5cbiAgICAgIEBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICB7e2Vycm9yLm1lc3NhZ2V9fVxuICAgICAgfSBAZWxzZSB7XG4gICAgICAgIFNvbWV0aGluZyB3ZWlyZCBoYXBwZW5lZC4gS2VlcCBjYWxtIGFuZCB0cnkgYWdhaW4gbGF0ZXIuXG4gICAgICB9XG4gICAgPC9wPlxuICA8L2Rpdj5cbn0gQGVsc2Uge1xuICA8YW5vbi1sb2FkaW5nIFtoZWlnaHRdPVwiMjUwXCIgLz5cbn1cbiJdfQ==