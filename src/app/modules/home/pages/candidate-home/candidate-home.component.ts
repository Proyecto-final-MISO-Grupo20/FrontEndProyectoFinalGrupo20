import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDataViewComponent } from '../../components/candidate-data-view/candidate-data-view.component';
import { Observable, tap } from 'rxjs';
import { CandidateHomeService } from '../../services/candidate-home/candidate-home.service';
import { LanguageModule } from 'language';
import { UtilCardComponent } from '../../components/util-card/util-card.component';
import { CardType } from '../../utils/card-type.enum';
import { Skill, SkillType } from '../../../technical-data/models/skills';
import { TechnicalLanguagesService } from '../../../technical-data/services/technical-languages/technical-languages.service';
import { MessageService } from 'primeng/api';
import { UiModule } from 'ui';

@Component({
  selector: 'app-candidate-home',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    CandidateDataViewComponent,
    LanguageModule,
    UtilCardComponent,
    UiModule,
  ],
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.scss'],
})
export class CandidateHomeComponent implements OnInit {
  candidateHomeService = inject(CandidateHomeService);
  technicalLanguagesService = inject(TechnicalLanguagesService);
  messageService = inject(MessageService);

  offersData!: any;
  languages$!: Observable<Skill[]>;
  loading = false;
  filteredData!: any;

  get cardType() {
    return CardType;
  }

  get skillType() {
    return SkillType;
  }

  ngOnInit(): void {
    this.getLanguages();
    this.getOffersData();
  }

  getOffersData() {
    this.candidateHomeService
      .getOffers()
      .pipe(
        tap((offers) => {
          this.offersData = offers;
          this.filteredData = offers;
        })
      )
      .subscribe();
  }

  getLanguages() {
    this.languages$ = this.technicalLanguagesService
      .getLanguages()
      .pipe(tap(() => (this.loading = false)));
  }

  onSearchChange(search: any) {
    this.filteredData = [...this.offersData];

    if (search.length > 0) {
      this.filteredData = this.filteredData.filter((offer: any) =>
        offer.perfil.toLocaleLowerCase().match(search.toLocaleLowerCase())
      );
    } else {
      this.filteredData = [...this.offersData];
    }
  }

  apply(offer: any) {
    this.candidateHomeService
      .assignCandidateToOffer({ ofertaId: offer.id })
      .subscribe({
        next: (res) => {
          this.show('success', 'Success', 'Aplicaste a la oferta');
        },
        error: (err) => {
          this.show('error', 'Error', 'Ya has aplicado a esta oferta');
        },
      });
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
