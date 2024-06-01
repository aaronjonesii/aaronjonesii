import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SwUpdateService } from './shared/services/sw-update.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: SwUpdateService,
          useValue: {
            checkForSwUpdate: async () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router-outlet directive', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
