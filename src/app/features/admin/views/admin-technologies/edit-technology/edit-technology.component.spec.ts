import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnologyComponent } from './edit-technology.component';
import { ActivatedRoute } from '@angular/router';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';

xdescribe('EditTechnologyComponent', () => {
  let component: EditTechnologyComponent;
  let fixture: ComponentFixture<EditTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTechnologyComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: TechnologiesService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
