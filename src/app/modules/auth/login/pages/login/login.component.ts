/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LanguageModule } from 'language';
import { UiModule } from 'ui';
import { LoginService } from '../../services/login.service';
import { typeUsersData } from 'src/app/core/utils/type-users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageModule, UiModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  errorMessage: string | undefined;
  username!: string | null;
  successRegister = false;
  router = inject(Router);

  get typeUsersData() {
    return typeUsersData;
  }

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.setUserName();
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['rr2r', [Validators.required]],
      password: ['12345678', Validators.required],
    });
  }

  onSubmit() {
    this.loginService.loginUser(this.loginForm.value).subscribe();
  }

  setUserName() {
    this.username = localStorage.getItem('[Register] username');
    localStorage.removeItem('[Register] username');

    if (this.username) {
      this.successRegister = true;

      setTimeout(() => (this.successRegister = false), 3000);
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('auth/register');
  }
}
