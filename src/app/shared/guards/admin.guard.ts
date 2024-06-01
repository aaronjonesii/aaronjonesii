import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn,
  Router, RouterStateSnapshot,
} from '@angular/router';
import { catchError, from, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { navPath } from '../../app.routes';
import { AuthService } from '../services/auth.service';
import { ConsoleLoggerService } from '../services/console-logger.service';

export const AdminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const logger = inject(ConsoleLoggerService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.loadUser.pipe(
    take(1),
    switchMap((user) => {
      if (user) {
        return from(auth.loadUserToken(user)).pipe(
          map((idTokenResult) => !!idTokenResult?.claims['admin']),
          tap((isAdmin) => {
            if (!isAdmin) router.navigate([navPath.forbidden]);
          })
        );
      } else {
        router.navigate(
          [navPath.signIn],
          { queryParams: { 'redirectURL': state.url } },
        );
        return of(false);
      }
    }),
    catchError((error) => {
      logger.error('Error in AdminGuard:', error);
      router.navigate([navPath.error]);
      return of(false);
    }),
  );
};
