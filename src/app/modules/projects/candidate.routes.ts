import { Route } from '@angular/router';
import { CandidateComponent } from '../candidate/pages/candidate/candidate.component';


export const candidatesRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Candidate',
    component: CandidateComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
