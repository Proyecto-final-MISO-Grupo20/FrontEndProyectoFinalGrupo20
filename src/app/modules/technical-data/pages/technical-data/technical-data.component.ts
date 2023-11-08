import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { TechnicalHabilitiesComponent } from '../technical-habilities/technical-habilities.component';
import { TechnicalToolsComponent } from '../technical-tools/technical-tools.component';
import { TechnicalLanguagesComponent } from '../technical-languages/technical-languages.component';
import { TechnicalDataService } from '../../services/technical-data/technical-data.service';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-technical-data',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    TechnicalHabilitiesComponent,
    TechnicalToolsComponent,
    TechnicalLanguagesComponent,
  ],
  templateUrl: './technical-data.component.html',
  styleUrls: ['./technical-data.component.scss'],
})
export class TechnicalDataComponent implements OnInit {
  technicalDataService = inject(TechnicalDataService);
  session = inject(SessionService);

  ngOnInit() {
    this.getCandidateSkills();
  }

  getCandidateSkills() {
    this.technicalDataService
      .getTechnicalSkillsByCandidate(this.session.getUser().id)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err),
      });
  }
}
