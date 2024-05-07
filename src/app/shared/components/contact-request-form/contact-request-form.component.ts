import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ContactRequestForm } from '../../forms/contact-request.form';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactRequest } from '../../interfaces/contact-request';

@Component({
  selector: 'aj-contact-request-form',
  templateUrl: './contact-request-form.component.html',
  styleUrl: './contact-request-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class ContactRequestFormComponent extends ContactRequestForm {
  @Output()
  readonly formSubmitted = new EventEmitter<ContactRequest>();

  onSubmit() {
    if (this.invalid) return;

    const contactRequest: ContactRequest = {
      name: this.name,
      company: this.company,
      email: this.email,
      message: this.message,
    };

    this.formSubmitted.emit(contactRequest);
  }
}
