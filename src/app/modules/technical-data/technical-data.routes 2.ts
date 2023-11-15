import { Route } from '@angular/router';
import { TechnicalDataComponent } from './pages/technical-data/technical-data.component';

export const technicalDataRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Technical Data',
    component: TechnicalDataComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
