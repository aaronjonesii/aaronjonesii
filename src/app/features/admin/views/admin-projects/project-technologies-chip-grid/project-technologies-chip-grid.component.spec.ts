import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTechnologiesChipGridComponent } from './project-technologies-chip-grid.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProjectTechnologiesComponent', () => {
  let component: ProjectTechnologiesChipGridComponent;
  let fixture: ComponentFixture<ProjectTechnologiesChipGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTechnologiesChipGridComponent],
      providers: [
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTechnologiesChipGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
