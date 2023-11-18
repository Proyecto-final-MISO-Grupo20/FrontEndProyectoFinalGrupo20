import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { FormsModule } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { BusinessHomeService } from '../../services/business-home/business-home.service';
import { CandidatesSkills } from '../../models/candidates-skills';
import { SkillType } from '../../../technical-data/models/skills';

@Component({
  selector: 'app-business-data-view',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule, FormsModule],
  templateUrl: './business-data-view.component.html',
  styleUrls: ['./business-data-view.component.scss'],
})
export class BusinessDataViewComponent implements OnInit {
  @Input() data!: any;

  businessHomeService = inject(BusinessHomeService);
  dataSubsctiption!: Subscription;
  searcher!: string;

  ngOnInit() {
    this.dataSubsctiption = this.businessHomeService.filteredData$
      .pipe(tap((data) => (this.data = data)))
      .subscribe();
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }

  validateLanguages(candidate: CandidatesSkills) {
    return candidate.skills
      .filter(({ skill }) => skill?.tipo === SkillType.IDIOMA)
      .map(({ skill }) => skill?.nombre);
  }

  getimageUrl(language: string | undefined) {
    const languageCode = language === 'Español' ? 'es' : 'en';

    return `assets/images/flags/${languageCode}.png`;
  }

  onSearchChange(search: string) {
    this.businessHomeService.setActiveFilters({
      ...this.businessHomeService.getActiveFilters(),
      search: search,
    });
  }
}
