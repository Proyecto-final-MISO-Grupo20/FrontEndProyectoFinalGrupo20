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
import { businessIdentificationTypes } from '../../../../../core/utils/identification-types';
import { RegisterService } from '../../services/register.service';
import { RegisterBusinessSteps } from '../../utils/register-business-steps';
import { Business } from '../../models/business';
import { cities } from '../../utils/cities';
import { businessType } from '../../utils/businessType';
import { businessSegment } from '../../utils/businessSegment';

@Component({
  selector: 'app-register-business-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiModule, LanguageModule],
  templateUrl: './register-business-form.component.html',
  styleUrls: ['./register-business-form.component.scss'],
})
export class RegisterBusinessFormComponent implements OnInit {
getCityOptions(): unknown[]|undefined {
throw new Error('Method not implemented.');
}
  // Form
  registerBusinessForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  // Data
  stepsData: MenuItem[] | undefined;
  currentStep!: RegisterBusinessSteps;
  steps = RegisterBusinessSteps;

  // Event
  @Output() backToMainForm = new EventEmitter();

  // Service
  registerBusinessService = inject(RegisterService);


  get countries() {
    return countries;
  }
  
  get cities() {
    return cities;
  }

  get businessType() {
    return businessType;
  }

  get businessSegment() {
    return businessSegment;
  }

  get businessIdentificationTypesData() {
    return businessIdentificationTypes;
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
      this.registerBusinessForm.get('ciudad')?.valid &&
      this.registerBusinessForm.get('direccion')?.valid &&
      this.registerBusinessForm.get('businessType')?.valid &&
      this.registerBusinessForm.get('businessSegment')?.valid;

    const step2Validation =
      this.registerBusinessForm.get('username')?.valid &&
      this.registerBusinessForm.get('email')?.valid &&
      this.registerBusinessForm.get('password')?.valid &&
      this.registerBusinessForm.get('passwordConfirm')?.valid;

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
      nombre: ['', [Validators.required, Validators.maxLength(10)]],
      tipoDocumento: ['', [Validators.required, Validators.maxLength(10)]],
      documento: ['', [Validators.required, Validators.maxLength(10)]],
      ciudad: ['', [Validators.required, Validators.maxLength(255)]],
      pais: ['', [Validators.required, Validators.maxLength(255)]],
      direccion: ['', [Validators.required, Validators.maxLength(10)]],
      businessType: ['', [Validators.required, Validators.maxLength(50)]],
      businessSegment: ['', [Validators.required, Validators.maxLength(255)]],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      passwordConfirm: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  setStepItems() {
    this.stepsData = [
      {
        label: 'Información General',
      },
      {
        label: 'Cuenta',
      },
    ];
  }

  onSubmit() {
    if (this.currentStep === this.steps.personalInformation) {
      this.registerBusinessService
        .createBusinessAccount(this.registerBusinessForm.value)
        .subscribe({
          next: (res: Business) => console.log(res),
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
    const { password, passwordConfirm } = this.registerBusinessForm.value;

    if (password === passwordConfirm) {
      return null; // Passwords match, no error
    } else {
      return { mismatch: true }; // Passwords do not match, return an error
    }
  }
}
