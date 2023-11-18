import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { RatingModule } from 'primeng/rating';
import { LanguageModule } from 'language';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockData_participants } from 'src/app/modules/interviews/utils/mock-data-participants';

@Component({
  selector: 'app-sort-table-participants',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sort-table-participants.component.html',
  styleUrls: ['./sort-table-participants.component.scss'],
})
export class SortTableParticipantsComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  @Input() mockData_participants!: any[];
  currentParticipant: any;

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
    this.mockData_participants = mockData_participants;
  }

  ngOnChanges() {
    this.setColumns();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      participant: ['', Validators.required],
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
   
    this.registerForm.reset();
    this.setShowConfirmDialog(false);
  }

  setCurrentEmployee(employee: any) {
    this.currentParticipant = employee;
    console.log(employee, 'Hola');
  }
}
