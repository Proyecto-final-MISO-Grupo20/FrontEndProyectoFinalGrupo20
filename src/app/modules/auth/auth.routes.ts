import { Route } from '@angular/router';
import { LoginComponent } from './login/pages/login/login.component';
import { RegisterComponent } from './register/pages/register/register.component';

export const authRoutes: Route[] = [
  {
    path: 'register',
    title: 'ABC Jobs | Register',
    component: RegisterComponent,
  },

  {
    path: 'login',
    title: 'ABC Jobs | Log in',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
