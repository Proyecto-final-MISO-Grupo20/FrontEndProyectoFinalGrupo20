import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api/api.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { Observable, concatMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #api = inject(ApiService);
  #http = inject(HttpClient);
  #session = inject(SessionService);

  loginUser(credentials: any): Observable<any> {
    return this.#api.post('auth/login', credentials).pipe(
      tap(({ token }) => {
        if (token) {
          this.#session.setUser({ ...this.#session.getUser(), token: token });
        }
      }),
      concatMap(() => this.getUserInfo())
    );
  }

  getUserInfo() {
    return this.#api.get('auth/me').pipe(
      tap((user) => {
        this.#session.setUser({ ...this.#session.getUser(), ...user });
      })
    );
  }
}
