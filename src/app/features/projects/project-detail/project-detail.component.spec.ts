import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { of } from "rxjs";
import { AuthService } from "../../../shared/services/auth.service";

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of()
          },
        },
        {
          provide: AuthService,
          useValue: {
            loadUser: of(null),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
