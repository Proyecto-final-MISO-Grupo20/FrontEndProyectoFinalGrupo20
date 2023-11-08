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
import { RegisterCandidateSteps } from '../../utils/register-candidate-steps';
import { countries } from '../../utils/countries';
import { identificationTypes } from '../../../../../core/utils/identification-types';
import { RegisterService } from '../../services/register.service';
import {
  ageRangeValidator,
  passwordMatchValidator,
} from '../../utils/candidate-form-validators';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { Keys } from '../../../../../core/utils/keys';

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
  loading = false;

  // Event
  @Output() backToMainForm = new EventEmitter();
  error!: string | null;

  // Service
  registerService = inject(RegisterService);
  router = inject(Router);

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
      this.registerForm.get('fecha_nacimiento')?.valid &&
      this.registerForm.get('documento')?.valid &&
      this.registerForm.get('tipo_documento')?.valid &&
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

    this.registerForm.valueChanges
      .pipe(
        map((changes) => {
          if (changes.tipo_documento) {
            changes.tipo_documento = changes.tipo_documento.code;
          }

          if (changes.pais) {
            changes.pais = changes.pais.name;

            if (changes.pais !== 'Colombia') {
              changes.tipo_documento = 2;
              this.registerForm?.get('tipo_documento')?.setErrors(null);
            }
          }

          return changes;
        })
      )
      .subscribe();
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
        tipo_documento: [null, Validators.required],
        documento: [null, Validators.required],
        fecha_nacimiento: ['', [Validators.required, ageRangeValidator]],
        pais: [this.countries[0], Validators.required],
        ciudad: ['', [Validators.required, Validators.maxLength(50)]],
        telefono: [null, Validators.required],
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
      this.loading = true;

      this.registerService
        .createCandidateAccount(this.registerForm.value)
        .subscribe({
          next: ({ username }) => {
            if (username) {
              localStorage.setItem(Keys.REGISTER_COMPLETE, username);
              this.router.navigate(['/auth/login']);
            }
          },
          error: (err) => {
            this.error = err.error.detail;
            this.loading = false;

            setTimeout(() => (this.error = null), 2000);
          },
          complete: () => (this.loading = false),
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
