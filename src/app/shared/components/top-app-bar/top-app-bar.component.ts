import { Component, Input, OnDestroy, signal } from '@angular/core';
import { navPath } from '../../../app.routes';
import { AsyncPipe } from '@angular/common';
import { TopAppBarService } from './top-app-bar.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import {
  SlideInFromLeftAnimation,
} from '../../animations/slide-in-from-left.animations';
import { RoutingService } from '../../services/routing.service';
import { User } from '@angular/fire/auth';
import { FadeInOutAnimation } from '../../animations/fade-in-out.animations';

@Component({
  selector: 'aj-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrl: './top-app-bar.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    RouterLinkActive,
    MatToolbarModule,
  ],
  animations: [
    SlideInFromLeftAnimation,
    FadeInOutAnimation,
  ],
})
export class TopAppBarComponent implements OnDestroy {
  @Input() title = 'Title';
  @Input() showBackBtn = false;
  @Input() loading = false;
  readonly nav_path = navPath;
  private subscriptions = new Subscription();
  private userSignal = signal<User | null>(null);
  user = this.userSignal.asReadonly();

  constructor(
    private auth: AuthService,
    private routing: RoutingService,
    private topAppBarService: TopAppBarService,
  ) {
    /** Set options from service */
    this.subscriptions.add(
      this.topAppBarService.options$.subscribe((options) => {
        this.title = options.title;
        this.showBackBtn = options.showBackBtn;
        this.loading = options.loading;
      }),
    );

    this.subscriptions.add(
      this.auth.user$.subscribe((user) => this.userSignal.set(user)),
    );
  }

  onBackBtnClick() {
    this.routing.goBack();
  }

  async onSignInBtnClick() {
    await this.auth.navigateToSignInWithRedirectUrl();
  }

  async onSignOutBtnClick() {
    await this.auth.logout();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
