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
import { typeUsers, typeUsersData } from '../../../../../core/utils/type-users';

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
  formBuilder = inject(FormBuilder);
 

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
    });
  }

  onSubmit() {
    const { user } = this.registerForm.value;

  }
}
