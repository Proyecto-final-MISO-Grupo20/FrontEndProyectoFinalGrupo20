import { Route } from '@angular/router';
import { InterviewsComponent } from './pages/interview/interviews.component';
import { InterviewsCreateComponent } from './pages/interview-create/interviews-create.component';

export const interviewsRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Interviews',
    component: InterviewsComponent,
  },
  {
    path: 'create',
    title: 'ABC Jobs | Interviews Create',
    component: InterviewsCreateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
