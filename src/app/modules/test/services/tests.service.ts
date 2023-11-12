import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Test } from '../models/test';
import { mockData_tests} from '../utils/mock-data-test';


@Injectable({
  providedIn: 'root',
})
export class TestsService {
  #api = inject(ApiService);

  getTests() {
    return of(mockData_tests);
  }
}
