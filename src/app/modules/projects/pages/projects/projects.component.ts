import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTableComponent } from '../../../../core/components/sort-table/sort-table.component';
import { ProjectsService } from '../../services/projects.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableComponent],
  providers: [ProjectsService],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects!: any[];
  projectsService = inject(ProjectsService);

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectsService
      .getProjects()
      .pipe(tap((projects) => (this.projects = projects)))
      .subscribe();
  }
}
