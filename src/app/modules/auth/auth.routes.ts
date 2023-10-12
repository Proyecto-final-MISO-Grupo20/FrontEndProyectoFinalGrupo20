import { Route } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

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
