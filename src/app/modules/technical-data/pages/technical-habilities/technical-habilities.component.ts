import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { Skill } from '../../models/skills';
import { TechnicalHabilitiesService } from '../../services/technical-habilities/technical-habilities.service';
import { TechnicalDataTableComponent } from '../../components/technical-data-table/technical-data-table.component';
import { CreateDialogComponent } from '../../components/create-dialog/create-dialog.component';
import { tap } from 'rxjs';

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
  habilities!: Skill[];
  technicalHabilitiesService = inject(TechnicalHabilitiesService);
  show = false;
  candidateHabilities!: any[];

  ngOnInit() {
    this.getHabilities();
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
      dominio: data.dominio,
    };

    if (this.candidateHabilities) {
      this.candidateHabilities = [
        ...this.candidateHabilities,
        { ...dataToSend },
      ];
    } else {
      this.candidateHabilities = [{ ...dataToSend }];
    }

    // this.technicalToolsService.assignTool(dataToSend).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => console.error(err),
    // });
  }
}
