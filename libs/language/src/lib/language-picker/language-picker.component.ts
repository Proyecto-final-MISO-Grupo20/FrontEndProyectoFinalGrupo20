import { Component, Input, OnInit, inject } from '@angular/core';
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

  @Input() styleClass!: string;

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe({
      next: (values: Language[]) => {
        this.languages = values;
      },
    });

    this.languageService.activeLanguage$.subscribe({
      next: (res) => {
        this.translocoService.setActiveLang(res);

        const activeLanguage = this.languageService.getLanguageByCode(
          this.translocoService.getActiveLang()
        );

        this.selectedLanguage =
          activeLanguage != null
            ? activeLanguage
            : this.languageService.getDefaultLanguage();
      },
    });
  }

  changeSiteLanguage(languageEvent: { value: { code: string; name: string } }) {
    if (languageEvent.value) {
      this.translocoService.setActiveLang(languageEvent.value.code);
      this.languageService.setActiveLanguage(languageEvent.value.code);
    } else {
      this.translocoService.setActiveLang(
        this.languageService.getDefaultLanguage().code
      );
    }
  }
}
