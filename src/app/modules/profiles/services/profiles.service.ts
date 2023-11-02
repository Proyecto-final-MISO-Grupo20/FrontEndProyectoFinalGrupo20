import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mockData_tools } from '../utils/mock-data_tools';
import { mockData_skills } from '../utils/mock-data_skills';
import { mockData_languages } from '../utils/mock-data_ language';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  getTools() {
    return of(mockData_tools);
  }
  getSkills() {
    return of(mockData_skills);
  }
  getLanguages() {
    return of(mockData_languages);
  }
}
