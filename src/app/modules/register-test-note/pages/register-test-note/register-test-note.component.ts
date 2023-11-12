import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { registerTestNoteService } from '../../services/register-test-note.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-registerTestNote',
  standalone: true,
  imports: [CommonModule, LanguageModule, UiModule, registerTestNoteComponent],
  providers: [registerTestNoteService],
  templateUrl: './register-test-note.component.html',
  styleUrls: ['./register-test-note.component.scss'],
})
export class registerTestNoteComponent implements OnInit {
  registerTestNoteService = inject(registerTestNoteService  );

  ngOnInit(): void {
    this.getregisterTestNote();
  }

  getregisterTestNote() {
    this.registerTestNoteService
      .getregisterTestNote()
      
      .subscribe();
  }
  
  
}
