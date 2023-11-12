import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { Skill } from '../../models/skills';
import { TechnicalHabilitiesService } from '../../services/technical-habilities/technical-habilities.service';
import { TechnicalDataTableComponent } from '../../components/technical-data-table/technical-data-table.component';
import { CreateDialogComponent } from '../../components/create-dialog/create-dialog.component';
import { Observable, tap } from 'rxjs';
import { SkillsCandidateDto } from '../../dtos/skills-candidate.dto';
import { TechnicalDataService } from '../../services/technical-data/technical-data.service';

@Component({
  selector: 'app-technical-habilities',
  standalone: true,
  imports: [
    CommonModule,
    LanguageModule,
    TechnicalDataTableComponent,
    CreateDialogComponent,
  ],
  templateUrl: './technical-habilities.component.html',
  styleUrls: ['./technical-habilities.component.scss'],
})
export class TechnicalHabilitiesComponent implements OnInit {
  @Input() candidateHabilities$!: Observable<SkillsCandidateDto[]>;
  candidateHabilities!: any[];

  habilities!: Skill[];
  technicalHabilitiesService = inject(TechnicalHabilitiesService);
  technicalDataService = inject(TechnicalDataService);

  show = false;

  ngOnInit() {
    this.getHabilities();
    this.getCandidateHabilities();
  }

  getHabilities() {
    this.technicalHabilitiesService
      .getHabilities()
      .pipe(tap((habilities) => (this.habilities = habilities)))
      .subscribe();
  }

  showConfirmDialog(show: boolean) {
    this.show = show;
  }

  assignHability(data: any) {
    this.show = false;

    const dataToSend = {
      skill: data.skill.nombre,
      nivel_dominio: data.dominio,
    };

    this.technicalDataService.assignSkill(dataToSend).subscribe({
      next: (res) => {
        const dataToShow = {
          name: data.skill.nombre,
          dominio: data.dominio,
        };

        if (this.candidateHabilities) {
          this.candidateHabilities = [
            ...this.candidateHabilities,
            { ...dataToShow },
          ];
        } else {
          this.candidateHabilities = [{ ...dataToShow }];
        }
      },
      error: (err) => console.error(err),
    });
  }

  getCandidateHabilities() {
    this.candidateHabilities$
      .pipe(tap((habilities) => (this.candidateHabilities = habilities)))
      .subscribe();
  }
}
