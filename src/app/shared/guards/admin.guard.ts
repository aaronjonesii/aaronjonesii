import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, from, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { nav_path } from "../../app.routes";
import { AuthService } from "../services/auth.service";
import { ConsoleLoggerService } from "../services/console-logger.service";

export const AdminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const logger = inject(ConsoleLoggerService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.loadUser.pipe(
    take(1),
    switchMap(user => {
      if (user) {
        return from(auth.loadUserToken(user)).pipe(
          map(idTokenResult => !!idTokenResult?.claims['admin']),
          tap((isAdmin) => { if (!isAdmin) router.navigate([nav_path.forbidden])})
        );
      } else {
        router.navigate([nav_path.signIn], { queryParams:{'redirectURL':state.url} });
        return of(false); }
    }),
    catchError((error) => {
      logger.error('Error in AdminGuard:', error);
      router.navigate([nav_path.error]);
      return of(false);
    }),
  );
}
