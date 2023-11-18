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
import { SessionService } from '../../services/session/session.service';

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
  session = inject(SessionService);

  columns!: string[];
  showConfirmDialog = false;
  showInterviewInformation = false;
  score = 1;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
  router: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }
  
  get userType(){
    return this.session.getUser().rol
    
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

  setShowInterviewInformation(show: boolean) {
    this.showInterviewInformation = show;
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
    
    
    this.registerForm.reset();
    this.showConfirmDialog = false;
    
  }
}
