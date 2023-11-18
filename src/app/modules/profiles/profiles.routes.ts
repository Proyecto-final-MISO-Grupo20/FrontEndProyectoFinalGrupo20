import { Route } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

export const profilesRoutes: Route[] = [
  {
    path: 'create/:projectId',
    title: 'ABC Jobs | Profiles',
    component: ProfileComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
