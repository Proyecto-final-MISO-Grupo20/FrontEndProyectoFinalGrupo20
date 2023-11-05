import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-data-view',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule, FormsModule],
  templateUrl: './business-data-view.component.html',
  styleUrls: ['./business-data-view.component.scss'],
})
export class BusinessDataViewComponent {
  @Input() data!: any;

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
}
