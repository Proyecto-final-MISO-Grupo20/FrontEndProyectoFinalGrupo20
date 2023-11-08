import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDataViewComponent } from '../../components/business-data-view/business-data-view/business-data-view.component';
import { BusinessHomeService } from '../../services/business-home/business-home.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-business-home',
  standalone: true,
  imports: [CommonModule, BusinessDataViewComponent],
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.scss'],
})
export class BusinessHomeComponent implements OnInit {
  businessHomeService = inject(BusinessHomeService);
  candidatesData!: any;

  ngOnInit(): void {
    this.getCandidatesData();
  }

  getCandidatesData() {
    this.businessHomeService
      .getCandidates()
      .pipe(tap((candidates) => (this.candidatesData = candidates)))
      .subscribe();
  }
}
