import { Injectable } from '@angular/core';
import { mockData } from '../utils/mock-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  getEmployees() {
    return of(mockData);
  }
}
