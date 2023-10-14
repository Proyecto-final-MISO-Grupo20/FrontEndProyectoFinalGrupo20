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
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  formBuilder = inject(FormBuilder);
 

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  

  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email } = this.loginForm.value;

  }
}
