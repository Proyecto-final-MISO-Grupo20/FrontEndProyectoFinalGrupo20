import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDataViewComponent } from '../../components/business-data-view/business-data-view/business-data-view.component';
import { BusinessHomeService } from '../../services/business-home/business-home.service';
import { Observable, tap } from 'rxjs';
import { UtilCardComponent } from '../../components/util-card/util-card.component';
import { CardType } from '../../utils/card-type.enum';
import { TechnicalLanguagesService } from '../../../technical-data/services/technical-languages/technical-languages.service';
import { Skill } from '../../../technical-data/models/skills';

@Component({
  selector: 'app-business-home',
  standalone: true,
  imports: [CommonModule, BusinessDataViewComponent, UtilCardComponent],
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.scss'],
})
export class BusinessHomeComponent implements OnInit {
  businessHomeService = inject(BusinessHomeService);
  technicalLanguagesService = inject(TechnicalLanguagesService);

  languages$!: Observable<Skill[]>;

  candidatesData!: any;

  get cardType() {
    return CardType;
  }

  ngOnInit(): void {
    this.getLanguages();
    this.getCandidatesData();
  }

  getCandidatesData() {
    this.businessHomeService
      .getCandidates()
      .pipe(tap((candidates) => (this.candidatesData = candidates)))
      .subscribe();
  }

  getLanguages() {
    this.languages$ = this.technicalLanguagesService.getLanguages();
  }
}
