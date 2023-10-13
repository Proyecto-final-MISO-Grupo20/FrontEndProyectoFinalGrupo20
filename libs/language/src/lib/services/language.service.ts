import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import { Language } from '../models/language';
import { LanguageCode } from '../models/language-code.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  #languageSpanish: Language = new Language(LanguageCode.spanish, 'Spanish');
  #languageEnglish: Language = new Language(LanguageCode.english, 'English');

  activeLanguageSubject = new BehaviorSubject<string>(
    this.getDefaultLanguage().code
  );

  activeLanguage$ = this.activeLanguageSubject
    .asObservable()
    .pipe(
      tap((languageCode) => localStorage.setItem('languageCode', languageCode))
    );

  constructor() {
    const languageCode: string =
      localStorage.getItem('languageCode') || this.getDefaultLanguage().code;

    this.setActiveLanguage(languageCode);
  }

  getAllLanguages(): Observable<Language[]> {
    const result: Observable<Language[]> = from([
      [this.#languageSpanish, this.#languageEnglish],
    ]);

    return result;
  }

  getDefaultLanguage(): Language {
    return this.#languageSpanish;
  }

  getLanguageByCode(code: string): Language {
    const result =
      code === 'en' ? this.#languageEnglish : this.#languageSpanish;

    return result;
  }

  setActiveLanguage(languageCode: string) {
    this.activeLanguageSubject.next(languageCode);
  }
}
