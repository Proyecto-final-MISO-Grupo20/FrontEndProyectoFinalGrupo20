import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { TechnicalDataTableComponent } from '../../components/technical-data-table/technical-data-table.component';
import { Skill } from '../../models/skills';
import { TechnicalToolsService } from '../../services/technical-tools/technical-tools.service';
import { Observable, tap } from 'rxjs';
import { SortTableComponent } from '../../../../core/components/sort-table/sort-table.component';
import { CreateDialogComponent } from '../../components/create-dialog/create-dialog.component';
import { AssignSkill } from '../../dtos/assign-skill.dto';
import { SkillsCandidateDto } from '../../dtos/skills-candidate.dto';
import { TechnicalDataService } from '../../services/technical-data/technical-data.service';

@Component({
  selector: 'app-technical-tools',
  standalone: true,
  imports: [
    CommonModule,
    LanguageModule,
    TechnicalDataTableComponent,
    SortTableComponent,
    CreateDialogComponent,
  ],
  templateUrl: './technical-tools.component.html',
  styleUrls: ['./technical-tools.component.scss'],
})
export class TechnicalToolsComponent implements OnInit {
  @Input() candidateTools$!: Observable<SkillsCandidateDto[]>;
  candidateTools!: SkillsCandidateDto[];

  tools!: Skill[];
  technicalToolsService = inject(TechnicalToolsService);
  technicalDataService = inject(TechnicalDataService);
  show = false;

  ngOnInit(): void {
    this.getTools();
    this.getCandidateTools();
  }

  getTools() {
    this.technicalToolsService
      .getTools()
      .pipe(tap((tools) => (this.tools = tools)))
      .subscribe();
  }

  showConfirmDialog(visible: boolean) {
    this.show = visible;
  }

  assignTool(data: any) {
    this.show = false;

    const dataToSend: AssignSkill = {
      skill: data.skill.id,
      nivel_dominio: data.dominio,
    };

    this.technicalDataService.assignSkill(dataToSend).subscribe({
      next: (res) => {
        const dataToShow = {
          name: data.skill.nombre,
          dominio: data.dominio,
        };
        if (this.candidateTools) {
          this.candidateTools = [...this.candidateTools, { ...dataToShow }];
        } else {
          this.candidateTools = [{ ...dataToShow }];
        }
      },
      error: (err) => console.error(err),
    });
  }

  getCandidateTools() {
    this.candidateTools$
      .pipe(tap((tools) => (this.candidateTools = tools)))
      .subscribe();
  }
}
