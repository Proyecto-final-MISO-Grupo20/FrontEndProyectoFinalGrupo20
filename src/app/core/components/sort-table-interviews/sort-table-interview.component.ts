import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  inject,
} from '@angular/core';
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
import { SessionService } from '../../services/session/session.service';
import { Interview } from '../../../modules/interviews/models/interview';

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
export class SortTableInterviewComponent implements OnInit, OnChanges {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  session = inject(SessionService);
  displayDialog = false;

  columns!: string[];
  showConfirmDialog = false;
  showInterviewInformation = false;
  score = 1;
  selectedInterview!: Interview;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
  router: any;
  commentValue: any;
  ratingValue: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  get userType() {
    return this.session.getUser().rol;
  }

  ngOnInit(): void {
    this.setColumns();
    this.checkScreenWidth();
    this.initializeForm();
  }

  ngOnChanges() {
    this.setColumns();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      interview: ['', Validators.required],
      score: ['', [Validators.required, Validators.maxLength(2)]],
      comment: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  handleClick(event: any, interview: Interview) {
    const iconClass = event.target.classList;
    if (iconClass.contains('pi-eye')) {
      this.setShowInterviewInformation(true, interview);
    } else if (iconClass.contains('pi-book')) {
      this.setShowConfirmDialog(true);
    }
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  setShowInterviewInformation(show: boolean, interview?: any) {
    this.selectedInterview = interview;
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
    if (this.data && this.data.length > 0) {
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
    this.registerForm.reset();
    this.showInterviewInformation = false;
    this.showConfirmDialog = false;
  }
}
