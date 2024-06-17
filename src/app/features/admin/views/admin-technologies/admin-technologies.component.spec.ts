import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechnologiesComponent } from './admin-technologies.component';
import {
  TechnologiesService,
} from '../../../../shared/services/technologies.service';

xdescribe('AdminTechnologiesComponent', () => {
  let component: AdminTechnologiesComponent;
  let fixture: ComponentFixture<AdminTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTechnologiesComponent],
      providers: [
        {
          provide: TechnologiesService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
