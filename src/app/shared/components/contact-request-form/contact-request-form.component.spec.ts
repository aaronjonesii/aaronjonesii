import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactRequestFormComponent } from './contact-request-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactRequestFormComponent', () => {
  let component: ContactRequestFormComponent;
  let fixture: ComponentFixture<ContactRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactRequestFormComponent,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
