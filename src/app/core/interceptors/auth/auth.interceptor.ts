import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { SessionService } from '../../services/session/session.service';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Keys } from '../../utils/keys';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if (session.getUser().token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.getUser().token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      toastrService.error(
        'Error',
        err.error?.detail?.msg ||
          err.error?.error ||
          'An unexpected error occurred, pleas try again later'
      );

      if (err && err.status === HttpStatusCode.Unauthorized) {
        localStorage.setItem(Keys.TOKEN_EXPIRED, err.error.detail.msg);

        session.logout();
        router.navigateByUrl('/auth');
      }

      throw err;
    })
  );
};
