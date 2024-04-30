import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { AuthService } from "../../../../../shared/services/auth.service";

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProjectComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: {
            docSnap: async () => {}
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (val: string) => val
              }
            }
          },
        },
        {
          provide: AuthService,
           useValue: {},
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
