import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { registerTestNote } from '../models/register-test-note';
import {  mockData_registerTestNote} from '../utils/register-test-note';


@Injectable({
  providedIn: 'root',
})
export class registerTestNoteService {
  #api = inject(ApiService);

  getregisterTestNote() {
    return of(mockData_registerTestNote);
  }
}
