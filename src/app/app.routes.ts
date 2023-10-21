import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    title: 'ABC Jobs | Auth',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((routes) => routes.authRoutes),
  },
  {
    path: 'home',
    title: 'ABC Jobs | Home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/home/pages/home/home.component').then(
        (component) => component.HomeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
