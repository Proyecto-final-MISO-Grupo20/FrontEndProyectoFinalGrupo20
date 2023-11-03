import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  #apiUrl = '/api';
  #http = inject(HttpClient);
  #session = inject(SessionService);

  get(uri: string): Observable<T> {
    return this.#http
      .get<T>(`${this.#apiUrl}/${uri}`, {
        headers: this.#makeHttpHeaders(),
      })
      .pipe(first());
  }

  post(uri: string, body?: T) {
    return this.#http
      .post<T>(`${this.#apiUrl}/${uri}`, body, {
        headers: this.#makeHttpHeaders(),
      })
      .pipe(first());
  }

  #makeHttpHeaders(): HttpHeaders {
    const { token } = this.#session.getUser();

    // Create an HttpHeaders object with the Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }
}
