import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  userSubject = new BehaviorSubject({});
  user$ = this.userSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');

    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return this.userSubject.value;
  }
}
