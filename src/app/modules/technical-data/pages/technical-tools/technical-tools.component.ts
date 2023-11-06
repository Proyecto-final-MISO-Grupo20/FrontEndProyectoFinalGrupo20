import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { TechnicalDataTableComponent } from '../../components/technical-data-table/technical-data-table.component';
import { Skill } from '../../models/skills';
import { TechnicalToolsService } from '../../services/technical-tools/technical-tools.service';
import { tap } from 'rxjs';
import { SortTableComponent } from '../../../../core/components/sort-table/sort-table.component';
import { CreateDialogComponent } from '../../components/create-dialog/create-dialog.component';

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
  tools!: Skill[];
  technicalToolsService = inject(TechnicalToolsService);
  show = false;
  candidatetools!: any[];

  ngOnInit(): void {
    this.getTools();
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

    const dataToSend = {
      skill: data.skill.nombre,
      dominio: data.dominio,
    };

    if (this.candidatetools) {
      this.candidatetools = [...this.candidatetools, { ...dataToSend }];
    } else {
      this.candidatetools = [{ ...dataToSend }];
    }

    // this.technicalToolsService.assignTool(dataToSend).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => console.error(err),
    // });
  }
}
