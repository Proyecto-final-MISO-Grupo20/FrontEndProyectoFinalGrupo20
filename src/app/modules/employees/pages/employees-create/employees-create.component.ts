import { Component, OnInit, inject } from '@angular/core';
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

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.employeeCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', Validators.maxLength(200)],
      code: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

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
