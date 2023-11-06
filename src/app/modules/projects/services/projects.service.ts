import { Injectable, inject } from '@angular/core';
import { mockData } from '../utils/mock-data';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  #api = inject(ApiService);

  getProjects() {
    return this.#api.get('proyecto/list');
  }

  createProject(projectData: Project): Observable<Project> {
    return this.#api.post('proyecto', projectData);
  }
}
