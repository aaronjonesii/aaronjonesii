import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageDialogComponent } from './select-image-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';
import { FirebaseStorageService } from 'angular-firebase-storage-manager';

describe('SelectImageDialogComponent', () => {
  let component: SelectImageDialogComponent;
  let fixture: ComponentFixture<SelectImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectImageDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: StorageService,
          useValue: {},
        },
        {
          provide: FirebaseStorageService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
