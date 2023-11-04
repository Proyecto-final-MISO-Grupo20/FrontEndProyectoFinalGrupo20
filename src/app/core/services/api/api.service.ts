import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  #apiUrl = '/api';
  #http = inject(HttpClient);

  get(uri: string): Observable<T> {
    return this.#http.get<T>(`${this.#apiUrl}/${uri}`).pipe(first());
  }

  post(uri: string, body?: T) {
    return this.#http.post<T>(`${this.#apiUrl}/${uri}`, body).pipe(first());
  }
}
