import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SortTableOffersComponent } from 'src/app/core/components/sort-table-offers/sort-table-offers.component';
import { OffersService } from '../../services/offers.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';
import { ActivatedRoute } from '@angular/router';

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
  activatedRoute = inject(ActivatedRoute);
  loading = false;

  createdOffer!: string | null;
  successCreate = false;
  offers!: any[];
  successCreateOffer!: string | null;
  projectId!: number;

  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.params['projectId'];
    this.getOffers();
    this.setSuccessCreated();
    this.setSucessCreatedOffer();
  }

  getOffers() {
    this.loading = true;

    this.offersService
      .getOffers(this.projectId)
      .pipe(
        tap((offers) => {
          this.offers = offers;
        })
      )
      .subscribe({ next: (res) => (this.loading = false) });
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
