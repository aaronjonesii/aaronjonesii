import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'aj-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BookAppointmentComponent {}
