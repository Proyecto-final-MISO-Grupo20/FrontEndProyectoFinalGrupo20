import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { MenuItem } from 'primeng/api';
import { RegisterCandidateSteps } from '../../utils/register-candidate-steps';
import { countries } from '../../utils/countries';
import { identificationTypes } from '../../../../../core/utils/identification-types';
import { RegisterService } from '../../services/register.service';
import {
  ageRangeValidator,
  passwordMatchValidator,
} from '../../utils/candidate-form-validators';

@Component({
  selector: 'app-register-candidate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiModule, LanguageModule],
  templateUrl: './register-candidate-form.component.html',
  styleUrls: ['./register-candidate-form.component.scss'],
})
export class RegisterCandidateFormComponent implements OnInit {
  // Form
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  // Data
  stepsData: MenuItem[] | undefined;
  currentStep!: RegisterCandidateSteps;
  steps = RegisterCandidateSteps;

  // Event
  @Output() backToMainForm = new EventEmitter();

  // Service
  registerService = inject(RegisterService);

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
      this.registerForm.get('nombre')?.valid &&
      this.registerForm.get('pais')?.valid &&
      this.registerForm.get('fechaNacimiento')?.valid &&
      this.registerForm.get('documento')?.valid &&
      this.registerForm.get('ciudad')?.valid;

    const step2Validation =
      this.registerForm.get('username')?.valid &&
      this.registerForm.get('email')?.valid &&
      this.registerForm.get('password')?.valid &&
      this.registerForm.get('passwordConfirm')?.valid &&
      this.registerForm.errors === null;

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
    this.registerForm = this.formBuilder.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        tipoDocumento: ['', Validators.required],
        documento: ['', Validators.required],
        fechaNacimiento: ['', [Validators.required, ageRangeValidator]],
        pais: ['', Validators.required],
        ciudad: ['', [Validators.required, Validators.maxLength(50)]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
        ],
        passwordConfirm: ['', Validators.required],
      },
      { validator: passwordMatchValidator }
    );
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
    if (this.currentStep === this.steps.createAccount) {
      this.registerService
        .createCandidateAccount(this.registerForm.value)
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.error(err),
        });
    }

    if (this.currentStep === this.steps.personalInformation) {
      this.currentStep = this.steps.createAccount;
    }
  }

  backToPreviousStep() {
    this.currentStep = this.steps.personalInformation;
  }

  goToMainRegister() {
    this.backToMainForm.emit(true);
  }
}
