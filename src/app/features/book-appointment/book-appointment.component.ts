import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { SeoService } from '../../shared/services/seo.service';
import { navPath } from '../../app.routes';

@Component({
  selector: 'aj-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BookAppointmentComponent {
  private readonly title = 'Book Appointment';

  constructor(
    private seoService: SeoService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.seoService.generateTags({
      title: this.title,
      route: navPath.bookAppointment,
    });
  }
}
