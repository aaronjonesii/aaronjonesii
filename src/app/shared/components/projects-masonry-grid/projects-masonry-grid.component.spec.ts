import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ProjectsMasonryGridComponent,
} from './projects-masonry-grid.component';

describe('ProjectsMasonryGridComponent', () => {
  let component: ProjectsMasonryGridComponent;
  let fixture: ComponentFixture<ProjectsMasonryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsMasonryGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsMasonryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
