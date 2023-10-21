import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  const { token } = session.getUser();

  if (!token) {
    if (route.url.find(({ path }) => path !== 'auth')) {
      router.navigateByUrl('auth');
    } else {
      return true;
    }
  }

  if (token) {
    if (route.url.find(({ path }) => path === 'auth')) {
      router.navigateByUrl('home');
    } else {
      return true;
    }
  }

  return !!token;
};
