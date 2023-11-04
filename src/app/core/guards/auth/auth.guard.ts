import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Keys } from '../../utils/keys';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem(Keys.USER);

  if (route.url.find(({ path }) => path !== 'auth')) {
    return user ? true : router.navigateByUrl('auth');
  }

  if (route.url.find(({ path }) => path === 'auth')) {
    return !user ? true : router.navigateByUrl('home');
  }

  return !user;
};
