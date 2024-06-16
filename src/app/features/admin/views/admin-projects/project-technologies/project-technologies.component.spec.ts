import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTechnologiesComponent } from './project-technologies.component';
import { provideAnimations } from "@angular/platform-browser/animations";

describe('ProjectTechnologiesComponent', () => {
  let component: ProjectTechnologiesComponent;
  let fixture: ComponentFixture<ProjectTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTechnologiesComponent],
      providers: [
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
