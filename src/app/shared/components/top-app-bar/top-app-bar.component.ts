import { Component, Input, OnDestroy } from '@angular/core';
import { navPath } from '../../../app.routes';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { TopAppBarService } from './top-app-bar.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aj-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrl: './top-app-bar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgClass,
  ],
})
export class TopAppBarComponent implements OnDestroy {
  @Input() title = 'Title';
  @Input() showBackBtn = false;
  @Input() loading = false;
  readonly nav_path = navPath;
  private subscriptions = new Subscription();

  constructor(
    public location: Location,
    public auth: AuthService,
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
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
