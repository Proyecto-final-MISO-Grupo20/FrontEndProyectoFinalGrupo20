import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDataViewComponent } from '../../components/candidate-data-view/candidate-data-view.component';
import { tap } from 'rxjs';
import { CandidateHomeService } from '../../services/candidate-home/candidate-home.service';

@Component({
  selector: 'app-candidate-home',
  standalone: true,
  imports: [CommonModule, CandidateDataViewComponent],
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.scss'],
})
export class CandidateHomeComponent {
  candidateHomeService = inject(CandidateHomeService);
  offersData!: any;

  ngOnInit(): void {
    this.getOffersData();
  }

  getOffersData() {
    this.candidateHomeService
      .getOffers()
      .pipe(tap((offers) => (this.offersData = offers)))
      .subscribe();
  }
}
