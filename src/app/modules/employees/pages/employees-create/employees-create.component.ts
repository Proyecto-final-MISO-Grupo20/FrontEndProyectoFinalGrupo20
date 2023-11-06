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
import { map } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.initializeForm();

    this.employeeCreateForm.valueChanges
      .pipe(
        map((changes) => {
          if (changes.tipo_documento) {
            changes.tipo_documento = changes.tipo_documento.code;
          }
          return changes;
        })
      )
      .subscribe();
  }

  initializeForm() {
    this.employeeCreateForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      tipo_documento: [null, Validators.required],
      documento: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      cargo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  onSubmit() {
    this.registerService
      .createEmployee(this.employeeCreateForm.value)
      .subscribe({
        next: (res) => this.router.navigateByUrl('employees'),
        error: (err) => console.error(err),
      });
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToEmployees() {
    this.router.navigateByUrl('/employees');
  }
}
