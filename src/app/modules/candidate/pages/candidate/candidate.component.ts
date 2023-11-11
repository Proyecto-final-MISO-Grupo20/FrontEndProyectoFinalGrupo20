import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { CandidatesService } from '../../services/candidates.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, LanguageModule, UiModule, CandidateComponent],
  providers: [CandidatesService],
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
  candidatesService = inject(CandidatesService);

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.candidatesService
      .getCandidates()
      
      .subscribe();
  }
}
