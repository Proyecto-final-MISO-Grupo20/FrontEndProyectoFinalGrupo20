import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTableComponent } from '../../../../core/components/sort-table/sort-table.component';
import { ProjectsService } from '../../services/projects.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableComponent, UiModule],
  providers: [ProjectsService],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projectsService = inject(ProjectsService);
  createdProject!: string | null;
  successCreate = false;
  projects!: any[];
  successCreateOffer!: string | null;

  ngOnInit(): void {
    this.getProjects();
    this.setSuccessCreated();
    this.setSucessCreatedOffer();
  }

  getProjects() {
    this.projectsService
      .getProjects(1)
      .pipe(
        tap((projects) => {
          console.log(projects);
          this.projects = projects;
        })
      )
      .subscribe();
  }

  setSuccessCreated() {
    this.createdProject = localStorage.getItem(Keys.CREATE_PROJECT_COMPLETE);

    if (this.createdProject) {
      this.successCreate = true;

      setTimeout(() => (this.successCreate = false), 3000);
      localStorage.removeItem(Keys.CREATE_PROJECT_COMPLETE);
    }
  }

  setSucessCreatedOffer() {
    this.successCreateOffer = localStorage.getItem(Keys.CREATE_OFFER_COMPLETE);

    setTimeout(() => (this.successCreateOffer = null), 3000);

    localStorage.removeItem(Keys.CREATE_OFFER_COMPLETE);
  }
}
