import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  userSubject = new BehaviorSubject<any>({});
  user$ = this.userSubject.asObservable();
  router = inject(Router);

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

  logout() {
    this.userSubject.next({});
    console.log(this.userSubject.value);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth');
  }
}
