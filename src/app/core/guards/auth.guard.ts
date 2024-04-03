import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { nav_path } from "../../app-routing.module";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.loadUser.pipe(
      take(1),
      map(user => !!user),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate([ nav_path.signIn ], { queryParams: { "redirectURL": state.url } });
        }
      })
    );
  }

}
