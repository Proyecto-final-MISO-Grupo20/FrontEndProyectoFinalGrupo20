import { Route } from '@angular/router';
import { ProfilesComponent } from '../profiles/pages/profiles/profile.component';

export const profilesRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Profiles',
    component: ProfilesComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
