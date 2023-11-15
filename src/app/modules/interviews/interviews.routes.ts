import { Route } from '@angular/router';
import { InterviewsComponent } from './pages/interview/interviews.component';

export const interviewsRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Interviews',
    component: InterviewsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
