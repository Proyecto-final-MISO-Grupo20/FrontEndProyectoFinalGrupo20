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
import { Application } from '../models/application';
import { Skill } from '../../technical-data/models/skills';
import { CreateContractDto } from '../dtos/create-contract.dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  #api = inject(ApiService);

  getApplications(offerId: number): Observable<Application[]> {
    return this.#api.get(`pruebas/${offerId}/postulaciones`).pipe(
      concatMap((applications: Application[]) => {
        // Create an array of observables
        const skillsData = applications.map((application) =>
          this.#api.get(`usuario/skills/${application.id}`).pipe(
            catchError((error: any) => {
              console.error(
                `Error fetching postulations for application ${application.id}`,
                error
              );
              // Return an observable with an empty array in case of an error
              return of([]);
            })
          )
        );

        // Use forkJoin to wait for all observables to complete
        return forkJoin(skillsData).pipe(
          mergeMap((skills: Skill[]) => {
            // Combine the applications with their corresponding skills
            const mergedSkills = applications.map((application, index) => ({
              ...application,
              skills: skills[index],
            }));

            // Return an observable with the merged skills
            return of(mergedSkills);
          })
        );
      })
    );
  }

  createContract(offerId: number, data: CreateContractDto) {
    return this.#api.post(`contratos/${offerId}`, data);
  }
}
