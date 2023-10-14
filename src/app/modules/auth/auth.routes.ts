import { Route } from '@angular/router';
import { RegisterComponent } from './register/pages/register/register.component';

export const authRoutes: Route[] = [
  {
    path: 'register',
    title: 'ABC Jobs | Register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'register',
  },
];
