import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTagsComponent } from './project-tags.component';

describe('ProjectTagsComponent', () => {
  let component: ProjectTagsComponent;
  let fixture: ComponentFixture<ProjectTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTagsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
