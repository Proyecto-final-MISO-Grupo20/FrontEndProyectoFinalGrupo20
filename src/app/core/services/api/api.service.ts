import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  #apiUrl = '/api';
  #http = inject(HttpClient);

  get(uri: string): Observable<T> {
    return this.#http.get<T>(`${this.#apiUrl}/${uri}`);
  }

  post(uri: string, body?: T) {
    return this.#http.post<T>(`${this.#apiUrl}/${uri}`, body);
  }
}
