import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGridItemComponent } from './project-grid-item.component';
import { ActivatedRoute } from '@angular/router';

describe('ProjectGridItemComponent', () => {
  let component: ProjectGridItemComponent;
  let fixture: ComponentFixture<ProjectGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGridItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
