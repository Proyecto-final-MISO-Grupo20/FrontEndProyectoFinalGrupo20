import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { CandidatesSkills } from '../../models/candidates-skills';

@Injectable({
  providedIn: 'root',
})
export class BusinessHomeService {
  #api = inject(ApiService);

  // Filters
  #activeFilters = new BehaviorSubject<any>({});
  activeFilters$ = this.#activeFilters.asObservable();

  #filteredData = new BehaviorSubject<CandidatesSkills[]>([]);
  filteredData$ = this.#filteredData.asObservable();

  getFilteredData() {
    return this.#filteredData.value;
  }

  setFilteredData(data: CandidatesSkills[]) {
    this.#filteredData.next(data);
  }

  getCandidates() {
    return this.#api.get('usuario/candidatos');
  }

  getActiveFilters() {
    return this.#activeFilters.value;
  }

  setActiveFilters(filter: any) {
    return this.#activeFilters.next(filter);
  }
}
