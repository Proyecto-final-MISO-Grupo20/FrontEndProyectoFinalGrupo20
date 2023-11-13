import { Injectable, inject } from '@angular/core';
import { Observable, mergeMap, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  #api = inject(ApiService);

  getProjects(projectId: number) {
    return this.#api.get('proyecto/list').pipe(
      mergeMap((projects) => {
        return this.#api.get(`offers/${projectId}`).pipe(
          mergeMap((offers) => {
            console.log(projects, 'll');
            console.log(offers, 'll');

            if (projects) {
              projects.forEach((project: Project) => {
                project.profiles = offers.filter(
                  (offer: any) => offer.proyecto_id === project.id
                );
              });
            }

            const fullProject = [...projects];
            return of(fullProject);
          })
        );
      })
    );
  }

  createProject(projectData: Project): Observable<Project> {
    return this.#api.post('proyecto', projectData);
  }
}
