import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockData_project } from 'src/app/modules/projects/utils/mock-data';

@Component({
  selector: 'app-sort-table2',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sort-table2.component.html',
  styleUrls: ['./sort-table2.component.scss'],
})
export class SortTable2Component implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  @Input() mockData_project!: any[];
  @Input() loading = false;
  currentEmployee: any;

  columns!: string[];
  showConfirmDialog = false;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.setColumns();
    this.checkScreenWidth();
    this.initializeForm();
    this.mockData_project = mockData_project;
  }

  ngOnChanges() {
    this.setColumns();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      project: ['', Validators.required],
    });
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth <= 1115;
    this.setTableStyle();
  }

  setTableStyle() {
    if (!this.isMobile) {
      this.tableStyle = { 'min-width': '70rem' };
    } else {
      this.tableStyle = { 'max-width': '50rem' };
    }
  }

  setColumns() {
    if (this.data && this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
  }

  addData() {
    // Find the current employee and update the project
    const foundIndex = this.data.findIndex(
      (employee) => employee.email === this.currentEmployee.email
    );
    if (foundIndex !== -1) {
      this.data[foundIndex].project.push(this.registerForm.value.project.name);
      this.data[foundIndex] = { ...this.data[foundIndex] };
      // Assign the updated data back to trigger change detection
      this.data = [...this.data];
    }
    this.registerForm.reset();
    this.setShowConfirmDialog(false);
  }

  setCurrentEmployee(employee: any) {
    this.currentEmployee = employee;
  }
}
