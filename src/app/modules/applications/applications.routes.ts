import { Route } from '@angular/router';
import { ApplicationComponent } from './pages/applications/application.component';

export const applicationsRoutes: Route[] = [
  {
    path: ':offerId',
    title: 'ABC Jobs | Applications',
    component: ApplicationComponent,
  },
];
