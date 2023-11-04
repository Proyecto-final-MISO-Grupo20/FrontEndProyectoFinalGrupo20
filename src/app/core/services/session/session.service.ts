import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { Keys } from '../../utils/keys';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  userSubject = new BehaviorSubject<any>({});
  user$ = this.userSubject.asObservable();
  router = inject(Router);

  constructor() {
    const user = localStorage.getItem(Keys.USER);

    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  setUser(user: User | any) {
    this.userSubject.next(user);
    localStorage.setItem(Keys.USER, JSON.stringify(user));
  }

  getUser(): User {
    return this.userSubject.value;
  }

  logout() {
    this.userSubject.next({});
    localStorage.removeItem(Keys.USER);
    this.router.navigateByUrl('/auth');
  }
}
