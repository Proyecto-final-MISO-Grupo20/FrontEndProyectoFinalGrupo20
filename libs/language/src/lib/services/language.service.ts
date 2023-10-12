import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  #languageEnglish: Language = new Language('en', 'English');
  #languageSpanish: Language = new Language('es', 'Spanish');

  constructor() {}

  getAllLanguages(): Observable<Language[]> {
    const result: Observable<Language[]> = from([
      [this.#languageEnglish, this.#languageSpanish],
    ]);

    return result;
  }

  getDefaultLanguage(): Language {
    return this.#languageSpanish;
  }

  getLanguageByCode(code: string): Language {
    const filter = {
      en: this.#languageEnglish,
      es: this.#languageSpanish,
    };

    const result =
      code === 'en' ? this.#languageEnglish : this.#languageSpanish;

    return result;
  }
}
