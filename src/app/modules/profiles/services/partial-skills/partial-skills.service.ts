import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssignSkill } from '../../dtos/create-offer.dto';

@Injectable({
  providedIn: 'root',
})
export class PartialSkillsService {
  // Tools
  #partialToolsSubject = new BehaviorSubject<AssignSkill[]>([]);
  partialTools$ = this.#partialToolsSubject.asObservable();

  setPartialTools(tools: AssignSkill[]) {
    this.#partialToolsSubject.next(tools);
  }

  getPartialTools() {
    return this.#partialToolsSubject.value;
  }
}
