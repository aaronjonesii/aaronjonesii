import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProjectsDialogComponent } from './select-projects-dialog.component';

xdescribe('SelectProjectsDialogComponent', () => {
  let component: SelectProjectsDialogComponent;
  let fixture: ComponentFixture<SelectProjectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProjectsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectProjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
