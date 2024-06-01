import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn,
  Router, RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, of, take, tap } from 'rxjs';
import { navPath } from '../../app.routes';
import { AuthService } from '../services/auth.service';
import { ConsoleLoggerService } from '../services/console-logger.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const logger = inject(ConsoleLoggerService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.loadUser.pipe(
    take(1),
    map((user) => !!user),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(
          [navPath.signIn],
          { queryParams: { redirectURL: state.url } },
        );
      }
    }),
    catchError((error) => {
      logger.error('Error in AuthGuard:', error);
      router.navigate([navPath.error]);
      return of(false);
    }),
  );
};
