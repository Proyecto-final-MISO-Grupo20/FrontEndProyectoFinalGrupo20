import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { CardType } from '../../utils/card-type.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-util-card',
  standalone: true,
  imports: [CommonModule, UiModule, FormsModule],
  templateUrl: './util-card.component.html',
  styleUrls: ['./util-card.component.scss'],
})
export class UtilCardComponent {
  @Input() headerTitle = 'Title';
  @Input() type = CardType.search;

  // checkbox
  @Input() options: any;
  selectedOptions: any[] = [];

  // search
  inputSearch!: string;

  get cardType() {
    return CardType;
  }
}
