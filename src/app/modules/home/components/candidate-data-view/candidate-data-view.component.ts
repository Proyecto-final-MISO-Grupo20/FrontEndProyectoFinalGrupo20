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

  ngOnInit() {
    console.log(this.data, 'jjj');
  }

  assignCandidateToOffer(offer: Offer) {
    this.candidateHomeService
      .assignCandidateToOffer({ ofertaId: offer.id })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => (console.error = err),
      });
  }
}
