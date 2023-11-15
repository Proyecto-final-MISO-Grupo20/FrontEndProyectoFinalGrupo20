import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { createTest } from '../models/create-test';
import {  mockData_createTest} from '../utils/mockData_createTest';


@Injectable({
  providedIn: 'root',
})
export class CreateTestService {
  #api = inject(ApiService);

  getcreateTest() {
    return of(mockData_createTest);
  }
}
