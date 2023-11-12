import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { registerTestNoteService } from '../../services/register-test-note.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-registerTestNote',
  standalone: true,
  imports: [CommonModule, LanguageModule, UiModule, registerTestNoteComponent, ReactiveFormsModule],
  providers: [registerTestNoteService],
  templateUrl: './register-test-note.component.html',
  styleUrls: ['./register-test-note.component.scss'],
})


export class registerTestNoteComponent implements OnInit {
  registerTestNoteService = inject(registerTestNoteService  );
  languageDomain = 1;
   // Input data
   @Input() header!: string;
   @Input() data!: any[];
   resultsForm!: FormGroup;
   formBuilder = inject(FormBuilder);
   showConfirmDialog = false;
   
   setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

   ngOnInit(): void {
    this.getregisterTestNote();
    this.initializeForm();
  }

  initializeForm() {
    this.resultsForm = this.formBuilder.group({
      languageName: ['', Validators.required],
    });
  }

  getregisterTestNote() {
    this.registerTestNoteService
      .getregisterTestNote()
      
      .subscribe();
  }
  increase() {
    this.languageDomain = this.languageDomain + 1;
  }
  decrease() {
    this.languageDomain = this.languageDomain - 1;
  }

  addData() {
    console.log(this.resultsForm.value);
    this.data = [
      ...this.data,
      {
        Language: this.resultsForm.value.languageName.Language,
        Domain: this.languageDomain,
      },
    ];
    this.setShowConfirmDialog(false);
    this.resultsForm.reset();
    this.languageDomain = 1;
  }
  
  
}
