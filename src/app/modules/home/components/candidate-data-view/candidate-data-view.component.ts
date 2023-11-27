import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { Offer } from '../../../../core/models/offer.model';
import { CandidateHomeService } from '../../services/candidate-home/candidate-home.service';
import { CandidatesSkills } from '../../models/candidates-skills';
import { SkillType } from '../../../technical-data/models/skills';
import { FormsModule } from '@angular/forms';
import { BusinessHomeService } from '../../services/business-home/business-home.service';

@Component({
  selector: 'app-candidate-data-view',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule, FormsModule],
  templateUrl: './candidate-data-view.component.html',
  styleUrls: ['./candidate-data-view.component.scss'],
})
export class CandidateDataViewComponent {
  @Input() data!: any;
  @Input() loading = false;
  @Output() searchFilter = new EventEmitter();
  @Output() apply = new EventEmitter();

  searcher!: string;
  candidateHomeService = inject(CandidateHomeService);
  businessHomeService = inject(BusinessHomeService);

  assignCandidateToOffer(offer: Offer) {
    this.candidateHomeService
      .assignCandidateToOffer({ ofertaId: offer.id })
      .subscribe({
        next: (res) => {
          offer.assigned = true;
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

  validateLanguages(offer: CandidatesSkills) {
    return offer.skills
      .filter(({ skill }) => skill?.tipo === SkillType.IDIOMA)
      .map(({ skill }) => skill?.nombre);
  }

  getimageUrl(languageCode: string | undefined) {
    return `assets/images/flags/${languageCode}.png`;
  }

  applyToOffer(offer: Offer) {
    this.apply.emit(offer);
  }

  onSearchChange(search: string) {
    this.searchFilter.emit(search);
  }
}
