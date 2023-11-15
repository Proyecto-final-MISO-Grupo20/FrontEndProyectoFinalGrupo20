import { Route } from '@angular/router';
import { OfferComponent } from '../offers/pages/offers/offer.component';

export const offersRoutes: Route[] = [
  {
    path: ':projectId',
    title: 'ABC Jobs | Offers',
    component: OfferComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
