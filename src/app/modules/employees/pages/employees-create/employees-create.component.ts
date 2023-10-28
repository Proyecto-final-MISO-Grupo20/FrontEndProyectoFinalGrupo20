/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiModule } from 'ui';
import { Router } from '@angular/router';
import { identificationTypes } from 'src/app/core/utils/identification-types';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employees-create',
  standalone: true,
  imports: [CommonModule, LanguageModule, ReactiveFormsModule, UiModule],
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.scss'],
})
export class EmployeesCreateComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  employeeCreateForm!: FormGroup;
  showConfirmDialog = false;

  // Event
  @Output() backToMainForm = new EventEmitter();
  error!: string | null;

  // Service
  registerService = inject(EmployeesService);

  get identificationTypes() {
    return identificationTypes;
  }

  get registerFormValid(): boolean | undefined {
    const step1Validation =
      this.employeeCreateForm.get('name')?.valid &&
      this.employeeCreateForm.get('identificationType')?.valid &&
      this.employeeCreateForm.get('identification')?.valid &&
      this.employeeCreateForm.get('rol')?.valid &&
      this.employeeCreateForm.get('email')?.valid;
  
    return step1Validation;
  }
 
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.employeeCreateForm = this.formBuilder.group(
      {
        name: ['',[
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        identificationType: [null, Validators.required],
        identification: ['', 
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(50)],
        rol: ['', 
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(50),],
        email: ['', 
          [Validators.required, 
          Validators.email, 
          Validators.minLength(3),
          Validators.maxLength(50),]],
      })}
  

  onSubmit() {
    console.log(this.employeeCreateForm.value);
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToEmployees() {
    this.router.navigateByUrl('/employees');
  }
}
