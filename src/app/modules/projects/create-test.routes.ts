import { Route } from '@angular/router';
import { CreateTestComponent } from '../create-test/pages/create-test/create-test.component';


export const CreateTestRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | CreateTest',
    component: CreateTestComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
