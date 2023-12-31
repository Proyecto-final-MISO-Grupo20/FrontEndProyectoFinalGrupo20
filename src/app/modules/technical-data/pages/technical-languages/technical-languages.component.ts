import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/skills';
import { TechnicalLanguagesService } from '../../services/technical-languages/technical-languages.service';
import { Observable, tap } from 'rxjs';
import { LanguageModule } from 'language';
import { UiModule } from 'ui';
import { TechnicalDataTableComponent } from '../../components/technical-data-table/technical-data-table.component';
import { CreateDialogComponent } from '../../components/create-dialog/create-dialog.component';
import { SkillsCandidateDto } from '../../dtos/skills-candidate.dto';
import { TechnicalDataService } from '../../services/technical-data/technical-data.service';

@Component({
  selector: 'app-technical-languages',
  standalone: true,
  imports: [
    CommonModule,
    LanguageModule,
    UiModule,
    TechnicalDataTableComponent,
    CreateDialogComponent,
  ],
  templateUrl: './technical-languages.component.html',
  styleUrls: ['./technical-languages.component.scss'],
})
export class TechnicalLanguagesComponent {
  @Input() candidateLanguages$!: Observable<SkillsCandidateDto[]>;
  candidateLanguages!: any[];

  languages!: Skill[];
  technicalLanguageService = inject(TechnicalLanguagesService);
  technicalDataService = inject(TechnicalDataService);

  show = false;

  ngOnInit(): void {
    this.getCandidateLanguages();
    this.getLanguages();
  }

  getLanguages() {
    this.technicalLanguageService
      .getLanguages()
      .pipe(tap((languages) => (this.languages = languages)))
      .subscribe();
  }

  showConfirmDialog(visible: boolean) {
    this.show = visible;
  }

  assignLanguage(data: any) {
    this.show = false;

    const dataToSend = {
      skill: data.skill.id,
      nivel_dominio: data.dominio,
    };

    this.technicalDataService.assignSkill(dataToSend).subscribe({
      next: (res) => {
        const dataToShow = {
          name: data.skill.nombre,
          dominio: data.dominio,
        };

        if (this.candidateLanguages) {
          this.candidateLanguages = [
            ...this.candidateLanguages,
            { ...dataToShow },
          ];
        } else {
          this.candidateLanguages = [{ ...dataToShow }];
        }
      },
      error: (err) => console.error(err),
    });
  }

  getCandidateLanguages() {
    this.candidateLanguages$
      .pipe(tap((habilities) => (this.candidateLanguages = habilities)))
      .subscribe();
  }
}
