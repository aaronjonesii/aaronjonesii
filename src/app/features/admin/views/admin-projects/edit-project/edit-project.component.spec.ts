import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProjectComponent } from './edit-project.component';
import { ActivatedRoute } from '@angular/router';
import {
  FirestoreService,
} from '../../../../../shared/services/firestore.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Storage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

xdescribe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProjectComponent,
      ],
      providers: [
        provideAnimations(),
        {
          provide: FirestoreService,
          useValue: {
            docSnap: async () => {},
            col$: () => of(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (val: string) => val,
              },
            },
          },
        },
        {
          provide: AuthService,
          useValue: {
            loadUser: () => of(null),
          },
        },
        {
          provide: Storage,
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
