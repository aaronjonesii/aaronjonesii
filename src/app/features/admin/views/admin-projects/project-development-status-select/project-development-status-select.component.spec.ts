import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ProjectDevelopmentStatusSelectComponent,
} from './project-development-status-select.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProjectDevelopmentStatusSelectComponent', () => {
  let component: ProjectDevelopmentStatusSelectComponent;
  let fixture: ComponentFixture<ProjectDevelopmentStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDevelopmentStatusSelectComponent],
      providers: [
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDevelopmentStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
