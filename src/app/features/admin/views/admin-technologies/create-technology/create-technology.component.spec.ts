import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnologyComponent } from './create-technology.component';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CreateTechnologyComponent', () => {
  let component: CreateTechnologyComponent;
  let fixture: ComponentFixture<CreateTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTechnologyComponent],
      providers: [
        {
          provide: TechnologiesService,
          useValue: {},
        },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
