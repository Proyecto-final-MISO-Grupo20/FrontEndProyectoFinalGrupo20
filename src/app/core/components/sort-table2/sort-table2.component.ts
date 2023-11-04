import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { RatingModule } from 'primeng/rating';
import { LanguageModule } from 'language';
import { IncrementalStateKind } from '@angular/compiler-cli/src/ngtsc/incremental';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sort-table2',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sort-table2.component.html',
  styleUrls: ['./sort-table2.component.scss'],
})
export class SortTable2Component implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

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
    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
  }

  addData() { console.log(this.registerForm.value)
    this.data = [...this.data, 
      {
      Project: this.registerForm.value.toolName.Tool,
      
    }]
    this.setShowConfirmDialog(false)
    this.registerForm.reset()
  }
}
