import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent, GITHUB_ICON_SVG } from './app.component';
import { MatIcon, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconTestingModule } from "@angular/material/icon/testing";
import { RouterModule } from "@angular/router";

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, MatIconTestingModule],
      declarations: [AppComponent, MatIcon]
    }).compileComponents();
  }));

  beforeEach(inject(
    [MatIconRegistry, DomSanitizer],
    (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
      iconRegistry.addSvgIconLiteral("github", sanitizer.bypassSecurityTrustHtml(GITHUB_ICON_SVG));
    }
  ));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a router-outlet directive', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
