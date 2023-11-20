import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessHomeService } from '../../services/business-home/business-home.service';
import { Observable, Subscription, tap } from 'rxjs';
import { UtilCardComponent } from '../../components/util-card/util-card.component';
import { CardType } from '../../utils/card-type.enum';
import { TechnicalLanguagesService } from '../../../technical-data/services/technical-languages/technical-languages.service';
import { Skill, SkillType } from '../../../technical-data/models/skills';
import { CandidatesSkills } from '../../models/candidates-skills';
import { BusinessDataViewComponent } from '../../components/business-data-view/business-data-view.component';
import { LanguageModule } from 'language';
import { UiModule } from 'ui';

@Component({
  selector: 'app-business-home',
  standalone: true,
  imports: [
    CommonModule,
    BusinessDataViewComponent,
    UtilCardComponent,
    LanguageModule,
    UiModule,
  ],
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.scss'],
})
export class BusinessHomeComponent implements OnInit, OnDestroy {
  businessHomeService = inject(BusinessHomeService);
  technicalLanguagesService = inject(TechnicalLanguagesService);
  loading = false;

  languages$!: Observable<Skill[]>;

  // Filters
  activeFilterObservable!: Subscription;

  candidatesData!: CandidatesSkills[];
  filteredData!: CandidatesSkills[];

  get cardType() {
    return CardType;
  }

  get skillType() {
    return SkillType;
  }

  ngOnInit(): void {
    this.getLanguages();
    this.getCandidatesData();
  }

  ngOnDestroy(): void {
    this.activeFilterObservable && this.activeFilterObservable.unsubscribe();
  }

  getCandidatesData() {
    this.loading = true;

    this.businessHomeService
      .getCandidates()
      .pipe(
        tap((candidates) => {
          this.candidatesData = candidates;
          this.filteredData = this.candidatesData;
          this.businessHomeService.setFilteredData(this.filteredData);
          this.observeActiveFilters();
        })
      )
      .subscribe({ next: (res) => (this.loading = false) });
  }

  getLanguages() {
    this.languages$ = this.technicalLanguagesService
      .getLanguages()
      .pipe(tap(() => (this.loading = false)));
  }

  observeActiveFilters() {
    this.activeFilterObservable =
      this.businessHomeService.activeFilters$.subscribe({
        next: (filters) => {
          this.activeFilters(filters);
        },
      });
  }

  activeFilters(filters: any) {
    this.activateLanguageFilters(filters[SkillType.IDIOMA]);
    this.activateToolFilters(filters[SkillType.HERRAMIENTA]);
    this.activateHabilityFilters(filters[SkillType.HABILIDAD]);
    this.searchNameFilter(filters['search']);

    // Emit filtered Data
    this.businessHomeService.setFilteredData(this.filteredData);
  }

  activateLanguageFilters(filters: Skill[]) {
    const languageFilters = new Set();

    filters &&
      filters.forEach((language: Skill) => {
        languageFilters.add(language.nombre);
      });

    if (languageFilters.size > 0) {
      this.filteredData = this.candidatesData.filter((candidate) => {
        return candidate.skills.some(
          ({ skill }) =>
            skill?.tipo === SkillType.IDIOMA &&
            languageFilters.has(skill.nombre)
        );
      });
    } else {
      this.filteredData = this.candidatesData;
    }
  }

  activateToolFilters(filter: string) {
    if (filter && filter.length && filter.length > 0) {
      this.filteredData = this.filteredData.filter((candidate) => {
        return candidate.skills.some(
          ({ skill }) =>
            skill?.tipo === SkillType.HERRAMIENTA &&
            skill?.nombre.toLowerCase().match(filter.toLowerCase())
        );
      });
    } else {
      this.filteredData = [...this.filteredData];
    }
  }

  activateHabilityFilters(filter: string) {
    if (filter && filter.length && filter.length > 0) {
      this.filteredData = this.filteredData.filter((candidate) => {
        return candidate.skills.some(
          ({ skill }) =>
            skill?.tipo === SkillType.HABILIDAD &&
            skill?.nombre.toLowerCase().match(filter.toLowerCase())
        );
      });
    } else {
      this.filteredData = [...this.filteredData];
    }
  }

  searchNameFilter(filter: string) {
    if (filter && filter.length && filter.length > 0) {
      this.filteredData = this.filteredData.filter((candidate) => {
        return candidate.nombre.toLocaleLowerCase().match(filter.toLowerCase());
      });
    } else {
      this.filteredData = [...this.filteredData];
    }
  }
}
