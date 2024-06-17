import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { SeoService } from '../../shared/services/seo.service';
import { navPath } from '../../app.routes';
import {
  SkeletonComponent,
} from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'aj-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SkeletonComponent,
  ],
})
export class BookAppointmentComponent {
  private readonly title = 'Book Appointment';

  loading = signal(true);

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

  onLoad(event: Event) {
    console.debug('load event', event);
  }
}
