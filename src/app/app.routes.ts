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
    path: 'projects',
    title: 'ABC Jobs | Projects',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/projects/projects.routes').then(
        (routes) => routes.projectsRoutes
      ),
  },
  {
    path: 'technical-data',
    title: 'ABC Jobs | Technical Data',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/technical-data/technical-data.routes').then(
        (routes) => routes.technicalDataRoutes
      ),
  },
  {
    path: 'employees',
    title: 'ABC Jobs | Employees',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/employees/employees.routes').then(
        (routes) => routes.employeesRoutes
      ),
  },

  {
    path: 'profiles',
    title: 'ABC Jobs | Profiles',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/projects/profiles.routes').then(
        (routes) => routes.profilesRoutes
      ),
  },
  {
    path: 'offers',
    title: 'ABC Jobs | Offers',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/projects/offers.routes').then(
        (routes) => routes.offersRoutes
      ),
  },
  {
    path: 'applications',
    title: 'ABC Jobs | Applications',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/projects/applications.routes').then(
        (routes) => routes.applicationsRoutes
      ),
  },
  {
    path: 'registerTestNote',
    title: 'ABC Jobs | RegisterResults',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/projects/register-test-note.routes').then(
        (routes) => routes.registerTestNoteRoutes
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
