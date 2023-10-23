import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { LanguageService } from './services/language.service';
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { UiModule } from 'ui';

@NgModule({
  imports: [CommonModule, TranslocoModule, UiModule, FormsModule],
  providers: [TranslocoService, LanguageService],
  declarations: [LanguagePickerComponent],
  exports: [TranslocoModule, LanguagePickerComponent],
})
export class LanguageModule {}
