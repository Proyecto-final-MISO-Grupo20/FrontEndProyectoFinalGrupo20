import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Application } from '../models/application';
import { mockData_applications} from '../utils/mock-data-applications';


@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  #api = inject(ApiService);

  getApplications() {
    return of(mockData_applications);
  }
}
