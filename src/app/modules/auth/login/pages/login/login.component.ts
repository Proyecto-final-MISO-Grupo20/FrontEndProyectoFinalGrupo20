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
import { RegisterSteps } from '../../../register/utils/register-steps';
import { typeUsersData } from 'src/app/core/utils/type-users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LanguageModule,
    UiModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  loginMessage: string | undefined;
  router: any;

  get typeUsersData() {
    return typeUsersData;
  }

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      console.log(credentials)
      

      this.loginService.loginUser(credentials).subscribe(
        (response) => {
          if (response === 'correcto') {
            this.loginMessage = 'El ingreso es correcto';
            this.router.navigate(['/register']);
          } else {
            this.loginMessage = 'Ingreso incorrecto';
            console.log('Ingreso incorrecto');
          }
        },
        (error) => {
          console.error('Error en el inicio de sesión', error);
          this.loginMessage = 'Error en el inicio de sesión';
        }
      );
    }
  }
}
