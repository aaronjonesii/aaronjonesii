import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { FirestoreService } from "../../shared/services/firestore.service";

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
