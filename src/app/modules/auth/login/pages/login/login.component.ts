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
import { Keys } from 'src/app/core/utils/keys';

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
      username: [this.username, [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loginService.loginUser(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl('home'),
      error: (error) => {
        this.errorMessage = error.error.error;

        setTimeout(() => (this.errorMessage = undefined), 3000);
      },
    });
  }

  setUserName() {
    this.username = localStorage.getItem(Keys.REGISTER_COMPLETE);

    if (this.username) {
      this.successRegister = true;

      setTimeout(() => (this.successRegister = false), 3000);
      localStorage.removeItem(Keys.REGISTER_COMPLETE);
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('auth/register');
  }
}
