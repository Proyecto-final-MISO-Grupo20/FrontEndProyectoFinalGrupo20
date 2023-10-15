import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-register-candidate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiModule, LanguageModule],
  templateUrl: './register-candidate-form.component.html',
  styleUrls: ['./register-candidate-form.component.scss'],
})
export class RegisterCandidateFormComponent implements OnInit {
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required, EmailValidator],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
}
