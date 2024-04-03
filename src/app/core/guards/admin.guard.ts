import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { nav_path } from '../../app-routing.module';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root', })
export class AdminGuard  {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> {
    return this.auth.loadUser.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return from(this.auth.loadUserToken(user))
            .pipe(
              map(idTokenResult => !!idTokenResult?.claims['admin']),
              tap((isAdmin) => { if (!isAdmin) this.router.navigate([nav_path.forbidden])})
            )
        } else {
          this.router.navigate([nav_path.signIn], { queryParams:{'redirectURL':state.url} });
          return of(false); }
      })
    )
  }
}
