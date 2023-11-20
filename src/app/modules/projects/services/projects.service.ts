import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  forkJoin,
  mergeMap,
  of,
} from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Project } from '../models/project';
import { Offer } from '../../../core/models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  #api = inject(ApiService);

  getProjects() {
    return this.#api.get('proyecto/list').pipe(
      concatMap((projects: Project[]) => {
        const offersData = projects.map((project: Project) =>
          this.#api.get(`offers/${project.id}`).pipe(
            catchError((error: any) => {
              console.error(
                `Error fetching offers for project ${project.id}`,
                error
              );
              return of([]);
            })
          )
        );

        return forkJoin(offersData).pipe(
          mergeMap((offers: Offer[]) => {
            const mergedProjects = projects.map((project, index) => ({
              ...project,
              profiles: offers[index],
            }));
            // Assuming you want to return the merged projects here
            return of(mergedProjects);
          })
        );
      })
    );
  }

  createProject(projectData: Project): Observable<Project> {
    return this.#api.post('proyecto', projectData);
  }
}
