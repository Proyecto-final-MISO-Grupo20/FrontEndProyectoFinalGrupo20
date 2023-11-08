import { Route } from '@angular/router';
import { ProfileComponent } from '../profiles/pages/profile/profile.component';

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
