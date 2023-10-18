import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
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
import { MenuItem } from 'primeng/api';
import { RegisterCandidateSteps } from '../../utils/register-candidate-steps';
import { countries } from '../../utils/countries';
import { identificationTypes } from '../../../../../core/utils/identification-types';
import { RegisterService } from '../../services/register.service';

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
      this.registerForm.get('name')?.valid &&
      this.registerForm.get('residenceCountry')?.valid &&
      this.registerForm.get('birthday')?.valid;

    return this.currentStep === this.steps.personalInformation
      ? step1Validation
      : false;
  }

  ngOnInit(): void {
    this.currentStep = this.steps.personalInformation;
    this.setStepItems();
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required, EmailValidator],
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
    if (this.currentStep === this.steps.personalInformation) {
      this.currentStep = this.steps.createAccount;
    }

    if (this.currentStep === this.steps.createAccount) {
      this.registerService
        .createCandidateAccount(this.registerForm.value)
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.error(err),
        });
    }
  }

  backToPreviousStep() {
    this.currentStep = this.steps.personalInformation;
  }

  goToMainRegister() {
    this.backToMainForm.emit(true);
  }
}
