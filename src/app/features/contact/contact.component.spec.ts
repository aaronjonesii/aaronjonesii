import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FirestoreService } from '../../shared/services/firestore.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
