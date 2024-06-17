import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ProjectDevelopmentStatusSelectComponent,
} from './project-development-status-select.component';

describe('ProjectDevelopmentStatusSelectComponent', () => {
  let component: ProjectDevelopmentStatusSelectComponent;
  let fixture: ComponentFixture<ProjectDevelopmentStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDevelopmentStatusSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDevelopmentStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
