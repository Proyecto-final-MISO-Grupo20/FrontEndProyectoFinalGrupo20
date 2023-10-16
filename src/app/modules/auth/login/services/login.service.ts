import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private backendUrl = 'http://34.71.25.18/users/auth';

  constructor(private http: HttpClient) {}

  loginUser(credentials: any) {
    return this.http.post(this.backendUrl, credentials);
  }
}
