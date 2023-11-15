import { Route } from '@angular/router';
import { TestComponent } from '../test/pages/test/test.component';

export const testsRoutes: Route[] = [
  {
    path: ':offerId',
    title: 'ABC Jobs | Test',
    component: TestComponent,
  },
];
