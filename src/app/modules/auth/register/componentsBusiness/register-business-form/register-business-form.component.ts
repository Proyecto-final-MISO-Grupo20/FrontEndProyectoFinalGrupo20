import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { MenuItem } from 'primeng/api';
import { countries } from '../../utils/countries';
import { identificationTypes } from '../../../../../core/utils/identification-types';
import { RegisterService } from '../../services/register.service';
import { RegisterBusinessSteps } from '../../utils/register-business-steps';

@Component({
  selector: 'app-register-business-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiModule, LanguageModule],
  templateUrl: './register-business-form.component.html',
  styleUrls: ['./register-business-form.component.scss'],
})
export class RegisterBusinessFormComponent implements OnInit {
  // Form
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  // Data
  stepsData: MenuItem[] | undefined;
  currentStep!: RegisterBusinessSteps;
  steps = RegisterBusinessSteps;

  // Event
  @Output() backToMainForm = new EventEmitter();

  // Service
  registerService = inject(RegisterService);
  registerBusinessForm: any;
  registerBusinessService: any;

  get countries() {
    return countries;
  }

  get identificationTypesData() {
    return identificationTypes;
  }

  get nextText() {
    return this.currentStep === this.steps.personalInformation
      ? 'next'
      : 'sign-up';
  }

  get registerFormValid(): boolean | undefined {
    const step1Validation =
      this.registerBusinessForm.get('nombre')?.valid &&
      this.registerBusinessForm.get('pais')?.valid &&
      this.registerBusinessForm.get('fechaNacimiento')?.valid;

    const step2Validation =
      this.registerBusinessForm.get('username')?.valid &&
      this.registerBusinessForm.get('email')?.valid &&
      this.registerBusinessForm.get('password')?.valid;

    return this.currentStep === this.steps.personalInformation
      ? step1Validation
      : step2Validation;
  }

  ngOnInit(): void {
    this.currentStep = this.steps.personalInformation;
    this.setStepItems();
    this.initializeForm();
  }

  initializeForm() {
    this.registerBusinessForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  setStepItems() {
    this.stepsData = [
      {
        label: 'Información Personal',
      },
      {
        label: 'Cuenta',
      },
    ];
  }

  onSubmit() {
    if (this.currentStep === this.steps.createBusinessAccount) {
      this.registerBusinessService
        .createCandidateAccount(this.registerForm.value)
        .subscribe({
          next: (res: any) => console.log(res),
          error: (err: any) => console.error(err),
        });
    }

    if (this.currentStep === this.steps.personalInformation) {
      this.currentStep = this.steps.createBusinessAccount;
    }
  }

  backToPreviousStep() {
    this.currentStep = this.steps.personalInformation;
  }

  goToMainRegister() {
    this.backToMainForm.emit(true);
  }

  // Custom validator function for password confirmation
  passwordMatchValidator() {
    const { password, passwordConfirm } = this.registerForm.value;

    if (password === passwordConfirm) {
      return null; // Passwords match, no error
    } else {
      return { mismatch: true }; // Passwords do not match, return an error
    }
  }
}
