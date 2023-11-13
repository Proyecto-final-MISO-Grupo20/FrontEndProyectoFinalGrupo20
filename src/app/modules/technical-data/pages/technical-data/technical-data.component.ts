import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { TechnicalHabilitiesComponent } from '../technical-habilities/technical-habilities.component';
import { TechnicalToolsComponent } from '../technical-tools/technical-tools.component';
import { TechnicalLanguagesComponent } from '../technical-languages/technical-languages.component';
import { TechnicalDataService } from '../../services/technical-data/technical-data.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { Observable, filter } from 'rxjs';
import { Skill, SkillType } from '../../models/skills';
import { SkillsCandidateDto } from '../../dtos/skills-candidate.dto';

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

  candidateTools$!: Observable<SkillsCandidateDto[]>;
  candidateHabilities$!: Observable<SkillsCandidateDto[]>;
  candidateLanguages$!: Observable<SkillsCandidateDto[]>;

  ngOnInit() {
    this.candidateHabilities$ =
      this.technicalDataService.getTechnicalSkillsByCandidate(
        SkillType.HABILIDAD
      );

    this.candidateTools$ =
      this.technicalDataService.getTechnicalSkillsByCandidate(
        SkillType.HERRAMIENTA
      );

    this.candidateLanguages$ =
      this.technicalDataService.getTechnicalSkillsByCandidate(SkillType.IDIOMA);
  }
}
