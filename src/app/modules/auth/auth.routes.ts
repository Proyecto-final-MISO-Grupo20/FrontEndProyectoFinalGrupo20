import { Route } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

export const authRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];
