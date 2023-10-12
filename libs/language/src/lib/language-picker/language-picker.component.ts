import { Component, OnInit, inject } from '@angular/core';
import { Language } from '../models/language';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'lib-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
})
export class LanguagePickerComponent implements OnInit {
  languages!: Language[];
  selectedLanguage!: Language;
  languageService = inject(LanguageService);
  translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe({
      next: (values: Language[]) => {
        this.languages = values;
      },
    });

    const activeLanguage = this.languageService.getLanguageByCode(
      this.translocoService.getActiveLang()
    );

    console.log(activeLanguage);

    this.selectedLanguage =
      activeLanguage != null
        ? activeLanguage
        : this.languageService.getDefaultLanguage();
  }

  changeSiteLanguage(languageEvent: any) {
    console.log(languageEvent);
    this.translocoService.setActiveLang(languageEvent.value.code);
  }
}
