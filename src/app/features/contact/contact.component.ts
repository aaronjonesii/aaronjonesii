import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
} from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { appInformation } from '../../information';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import {
  ConsoleLoggerService,
} from '../../shared/services/console-logger.service';
import { SeoService } from '../../shared/services/seo.service';
import {
  ContactRequestFormComponent,
} from '../../shared/components/contact-request-form/contact-request-form.component';
import { ContactRequest } from '../../shared/interfaces/contact-request';
import { RoutingService } from '../../shared/services/routing.service';
import {
  ContactRequestsService,
} from '../../shared/services/contact-requests.service';
import { MatButtonModule } from '@angular/material/button';
import {
  SlideInFromLeftAnimation,
} from '../../shared/animations/slide-in-from-left.animations';
import { FirebaseError } from '@angular/fire/app';
import {
  SlideInFromRightAnimation,
} from '../../shared/animations/slide-in-from-right.animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

enum Status {
  PENDING = 'pending',
  ERROR = 'error',
  SUCCESS = 'success',
  LOADING = 'loading',
}

@Component({
  selector: 'aj-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatExpansionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ContactRequestFormComponent,
  ],
  animations: [
    SlideInFromLeftAnimation,
    SlideInFromRightAnimation,
  ],
})
export class ContactComponent {
  private readonly title = 'Contact';
  readonly contactEmail = appInformation.email;
  protected readonly Status = Status;
  error: FirebaseError | null = null;
  private statusSignal = signal<Status>(Status.PENDING);
  status = this.statusSignal.asReadonly();

  constructor(
    private seoService: SeoService,
    private routing: RoutingService,
    private cdRef: ChangeDetectorRef,
    private logger: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
    private contactRequestService: ContactRequestsService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.seoService.generateTags({
      title: this.title,
      route: navPath.contact,
    });
  }

  scrollToForm() {
    this.routing.scrollToElementId('contact-container');
  }

  async onSubmit(contactRequest: ContactRequest): Promise<void> {
    this.statusSignal.set(Status.LOADING);
    this.cdRef.markForCheck();

    this.contactRequestService.add(contactRequest).then(() => {
      this.logger.log(
        `Contact request received, I will follow up with you soon.`,
      );
      this.statusSignal.set(Status.SUCCESS);
    }).catch((error: FirebaseError) => {
      this.error = error;
      this.logger.error(
        `Something went wrong sending your contact request.`, error,
      );
      this.statusSignal.set(Status.ERROR);
    }).finally(() => this.cdRef.markForCheck());
  }

  onTryAgainBtnClick() {
    this.error = null;
    this.statusSignal.set(Status.PENDING);
    this.cdRef.markForCheck();
  }

  onReset() {
    this.statusSignal.set(Status.PENDING);
    this.cdRef.markForCheck();
  }
}
