import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { candidatesMock } from '../../utils/candidate-mock';

@Injectable({
  providedIn: 'root',
})
export class BusinessHomeService {
  getCandidates() {
    return of(candidatesMock);
  }
}
