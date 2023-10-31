import { Injectable } from '@angular/core';
import { mockData } from '../../projects/utils/mock-data';
import { of } from 'rxjs';
import { mockData_profiles } from '../utils/mock-data_profiles';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  getProfiles() {
    return of(mockData_profiles);
  }
}
