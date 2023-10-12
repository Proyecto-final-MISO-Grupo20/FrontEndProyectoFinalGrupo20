import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    title: 'ABC Jobs | Auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((routes) => routes.authRoutes),
  },
];
