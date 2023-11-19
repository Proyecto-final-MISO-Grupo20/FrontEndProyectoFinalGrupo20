import { Route } from '@angular/router';
import { ProfileComponent } from '../profiles/pages/profile/profile.component';

export const profilesViewRoutes: Route[] = [
  {
    path: 'view/:projectId',
    title: 'ABC Jobs | Profiles',
    component: ProfileComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
