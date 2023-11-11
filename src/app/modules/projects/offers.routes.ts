import { Route } from '@angular/router';
import { OfferComponent } from '../offers/pages/offers/offer.component';

export const offersRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Offers',
    component: OfferComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
