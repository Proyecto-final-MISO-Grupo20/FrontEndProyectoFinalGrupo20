import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { SessionService } from '../../services/session/session.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { Keys } from '../../utils/keys';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.getUser().token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.getUser().token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err && err.status === HttpStatusCode.Unauthorized) {
        localStorage.setItem(Keys.TOKEN_EXPIRED, err.error.detail.msg);

        session.logout();
        router.navigateByUrl('/auth');
      }

      throw err;
    })
  );
};
