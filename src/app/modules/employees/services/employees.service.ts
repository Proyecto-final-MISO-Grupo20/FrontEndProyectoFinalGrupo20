import { Injectable, inject } from '@angular/core';
import { mockData } from '../utils/mock-data';
import { of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  #api = inject(ApiService);

  getEmployees() {
    return this.#api.get('proyecto/empleados/list');
  }

  createEmployee(emplyeeData: any) {
    return this.#api.post('proyecto/empleado', emplyeeData);
  }
}
