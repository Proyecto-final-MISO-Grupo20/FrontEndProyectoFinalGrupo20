import { Route } from '@angular/router';
import { ApplicationComponent } from '../applications/pages/applications/application.component';


export const applicationsRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Applications',
    component: ApplicationComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
