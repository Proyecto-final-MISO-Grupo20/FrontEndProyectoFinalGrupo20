import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { Offer } from 'src/app/core/models/offer.model';
import { CandidateHomeService } from '../../services/candidate-home/candidate-home.service';

@Component({
  selector: 'app-candidate-data-view',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule],
  templateUrl: './candidate-data-view.component.html',
  styleUrls: ['./candidate-data-view.component.scss'],
})
export class CandidateDataViewComponent {
  @Input() data!: any;
  candidateHomeService = inject(CandidateHomeService);

  assignCandidateToOffer(offer: Offer) {
    this.candidateHomeService
      .assignCandidateToOffer({ ofertaId: offer.id })
      .subscribe({
        next: (res) => {
          offer.assigned = true;
          console.log(offer);
        },
        error: (err) => (console.error = err),
      });
  }

  getAsignTagColor(offer: Offer) {
    return offer.assigned && 'gray';
  }

  getAsignTagDetail(offer: Offer) {
    return offer.assigned ? 'Aplicaste' : 'Aplicar';
  }
}
