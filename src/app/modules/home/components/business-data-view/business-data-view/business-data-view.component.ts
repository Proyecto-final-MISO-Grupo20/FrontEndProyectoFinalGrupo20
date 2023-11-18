import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { FormsModule } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { BusinessHomeService } from '../../../services/business-home/business-home.service';

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
}
