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
import { cities } from '../../utils/cities';
import { passwordMatchValidator } from '../../utils/candidate-form-validators';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BusinessType } from '../../models/business-type';
import { BusinessSegment } from '../../models/business-segments';

@Component({
  selector: 'app-register-business-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiModule, LanguageModule],
  templateUrl: './register-business-form.component.html',
  styleUrls: ['./register-business-form.component.scss'],
})
export class RegisterBusinessFormComponent implements OnInit {
  // Form
  registerBusinessForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  // Data
  stepsData: MenuItem[] | undefined;
  currentStep!: RegisterBusinessSteps;
  steps = RegisterBusinessSteps;

  router = inject(Router);
  error!: string | null;

  businessTypes!: BusinessType[];
  businessSegments!: BusinessSegment[];

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
      this.registerBusinessForm.get('tipoEmpresaId')?.valid &&
      this.registerBusinessForm.get('tipo_documento')?.valid;
    this.registerBusinessForm.get('segmentoId')?.valid;

    const step2Validation =
      this.registerBusinessForm.get('username')?.valid &&
      this.registerBusinessForm.get('email')?.valid &&
      this.registerBusinessForm.get('password')?.valid &&
      this.registerBusinessForm.get('passwordConfirm')?.valid &&
      this.registerBusinessForm.errors === null;

    return this.currentStep === this.steps.personalInformation
      ? step1Validation
      : step2Validation;
  }

  ngOnInit(): void {
    this.currentStep = this.steps.personalInformation;

    this.setStepItems();
    this.initializeForm();
    this.listenFormChanges();

    this.getBusinessTypes();
    this.getBusinessSegments();
  }

  initializeForm() {
    this.registerBusinessForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(10)]],
        tipo_documento: ['', [Validators.required, Validators.maxLength(10)]],
        documento: ['', [Validators.required, Validators.maxLength(10)]],
        ciudad: ['', [Validators.required, Validators.maxLength(255)]],
        pais: ['', [Validators.required, Validators.maxLength(255)]],
        direccion: ['', [Validators.required, Validators.maxLength(10)]],
        tipoEmpresaId: ['', [Validators.required, Validators.maxLength(50)]],
        segmentoId: ['', [Validators.required, Validators.maxLength(255)]],
        username: ['', [Validators.required, Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.maxLength(255)]],
        password: ['', [Validators.required, Validators.maxLength(10)]],
        passwordConfirm: ['', [Validators.required, Validators.maxLength(10)]],
      },
      { validator: passwordMatchValidator }
    );
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
    if (this.currentStep === this.steps.createBusinessAccount) {
      this.registerBusinessService
        .createBusinessAccount(this.registerBusinessForm.value)
        .subscribe({
          next: ({ username }) => {
            if (username) {
              localStorage.setItem('[Register] username', username);
              this.router.navigate(['/auth/login']);
            }
          },
          error: (err) => {
            this.error = err.error.detail;

            setTimeout(() => (this.error = null), 2000);
          },
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

  listenFormChanges() {
    this.registerBusinessForm.valueChanges
      .pipe(
        map((changes) => {
          if (changes.tipo_documento) {
            changes.tipo_documento = changes.tipo_documento.code;
          }

          if (changes.pais) {
            changes.pais = changes.pais.name;
          }

          if (changes.ciudad) {
            changes.ciudad = changes.ciudad.name;
          }

          if (changes.tipoEmpresaId) {
            changes.tipoEmpresaId = changes.tipoEmpresaId.id;
          }

          if (changes.segmentoId) {
            changes.segmentoId = changes.segmentoId.id;
          }

          return changes;
        })
      )
      .subscribe();
  }

  getBusinessTypes() {
    this.registerBusinessService
      .getBusinessTypes()
      .pipe(tap((businessTypes) => (this.businessTypes = businessTypes)))
      .subscribe();
  }

  getBusinessSegments() {
    this.registerBusinessService
      .getBusinessSegments()
      .pipe(
        tap((businessSegments) => (this.businessSegments = businessSegments))
      )
      .subscribe();
  }
}
