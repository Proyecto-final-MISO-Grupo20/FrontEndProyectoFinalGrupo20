import { Route } from '@angular/router';
import { ProfileComponent } from '../profiles/pages/profile/profile.component';

export const profilesRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Profiles',
    component: ProfileComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
