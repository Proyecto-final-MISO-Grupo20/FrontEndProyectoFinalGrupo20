import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { FormsModule } from '@angular/forms';
import { CandidatesSkills } from '../../models/candidates-skills';
import { SkillType } from '../../../technical-data/models/skills';

@Component({
  selector: 'app-business-data-dialog',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule, FormsModule],
  templateUrl: './business-data-dialog.component.html',
  styleUrls: ['./business-data-dialog.component.scss'],
})
export class BusinessDataDialogComponent {
  @Input() data!: CandidatesSkills;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter();

  get object() {
    return Object;
  }

  get skillType() {
    return SkillType;
  }

  onDialogHide() {
    this.visibleChange.emit(false);
  }
}
