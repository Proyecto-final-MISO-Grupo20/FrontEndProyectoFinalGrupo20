import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SortTableOffersComponent } from 'src/app/core/components/sort-table-offers/sort-table-offers.component';
import { OffersService } from '../../services/offers.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableOffersComponent, UiModule],
  providers: [OffersService],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  offersService = inject(OffersService);
  createdOffer!: string | null;
  successCreate = false;
  offers!: any[];
  successCreateOffer!: string | null;

  ngOnInit(): void {
    this.getOffers();
    this.setSuccessCreated();
    this.setSucessCreatedOffer();
  }

  getOffers() {
    this.offersService
      .getOffers()
      .pipe(
        tap((offers) => {
          offers.forEach((offer: any) => {
            offer.profiles = [];
          });

          this.offers = offers;
        })
      )
      .subscribe();
  }

  setSuccessCreated() {
    this.createdOffer = localStorage.getItem(Keys.CREATE_OFFER_COMPLETE);

    if (this.createdOffer) {
      this.successCreate = true;

      setTimeout(() => (this.successCreate = false), 3000);
      localStorage.removeItem(Keys.CREATE_OFFER_COMPLETE);
    }
  }

  setSucessCreatedOffer() {
    this.successCreateOffer = localStorage.getItem(Keys.CREATE_OFFER_COMPLETE);

    setTimeout(() => (this.successCreateOffer = null), 3000);

    localStorage.removeItem(Keys.CREATE_OFFER_COMPLETE);
  }
}
