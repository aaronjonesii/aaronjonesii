import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ProjectsService } from '../../shared/services/projects.service';
import { of } from 'rxjs';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent,
      ],
      providers: [
        provideAnimations(),
        {
          provide: ProjectsService,
          useValue: {
            getFilteredProjects$: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
