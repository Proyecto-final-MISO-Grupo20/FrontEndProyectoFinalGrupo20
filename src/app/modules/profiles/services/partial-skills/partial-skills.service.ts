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

  pushPartialTool(tool: AssignSkill) {
    this.#partialToolsSubject.value.push(tool);
  }

  removePartialTool(toolToRemove: AssignSkill) {
    const index = this.getPartialTools().findIndex(
      (tool) => toolToRemove.skill_id === tool.skill_id
    );

    this.#partialToolsSubject.value.splice(index, 1);
  }

  getPartialTools() {
    return this.#partialToolsSubject.value;
  }
}
