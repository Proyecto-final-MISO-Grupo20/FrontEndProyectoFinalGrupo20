import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { CardType } from '../../utils/card-type.enum';
import { FormsModule } from '@angular/forms';
import { BusinessHomeService } from '../../services/business-home/business-home.service';
import { SkillType } from '../../../technical-data/models/skills';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-util-card',
  standalone: true,
  imports: [CommonModule, UiModule, FormsModule, LanguageModule],
  templateUrl: './util-card.component.html',
  styleUrls: ['./util-card.component.scss'],
})
export class UtilCardComponent {
  @Input() headerTitle = 'Title';
  @Input() type = CardType.search;
  @Input() searchType!: SkillType;
  @Input() loading = false;

  businessHomeService = inject(BusinessHomeService);

  // checkbox
  @Input() options: any = [
    { id: 'star5', value: 5, label: '5 Stars' },
    { id: 'star4', value: 4, label: '4 Stars' },
    { id: 'star3', value: 3, label: '3 Stars' },
    { id: 'star2', value: 2, label: '2 Stars' },
    { id: 'star1', value: 1, label: '1 Star' },
  ];
  selectedOptions: any[] = [];

  // search
  inputSearch!: string;

  get cardType() {
    return CardType;
  }

  onCheckboxChange(data: any) {
    this.businessHomeService.setActiveFilters({
      ...this.businessHomeService.getActiveFilters(),
      [SkillType.IDIOMA]: data,
    });
  }

  onInputChange(search: string) {
    this.businessHomeService.setActiveFilters({
      ...this.businessHomeService.getActiveFilters(),
      [this.searchType]: search,
    });
  }
}
