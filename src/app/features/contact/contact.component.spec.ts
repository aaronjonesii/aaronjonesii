import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FirestoreService } from '../../shared/services/firestore.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingService } from '../../shared/services/routing.service';

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
        {
          provide: RoutingService,
          useValue: RoutingService,
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
