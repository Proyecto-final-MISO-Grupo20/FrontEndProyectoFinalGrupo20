import { Injectable } from '@angular/core';
import { mockData } from '../../projects/utils/mock-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  getProfiles() {
    return of(mockData);
  }
}
