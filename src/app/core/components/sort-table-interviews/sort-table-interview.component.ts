import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { RatingModule } from 'primeng/rating';
import { LanguageModule } from 'language';
import { IncrementalStateKind } from '@angular/compiler-cli/src/ngtsc/incremental';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sort-table-interview',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sort-table-interview.component.html',
  styleUrls: ['./sort-table-interview.component.scss'],
})
export class SortTableInterviewComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  columns!: string[];
  showConfirmDialog = false;
  score = 1;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
  router: any;

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
      interview: ['', Validators.required],
      score: ['', Validators.required],
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
  increase() {
    this.score = this.score + 1;
  }
  decrease() {
    this.score = this.score - 1;
  }

  addData() {
    console.log(this.registerForm.value);
    this.data = [
      {
        Interview: this.registerForm.value.interview.Interview,
        Score: this.registerForm.value.score.Score,
      },
    ];
    
    this.registerForm.reset();
    this.showConfirmDialog = false;
    
  }
}
