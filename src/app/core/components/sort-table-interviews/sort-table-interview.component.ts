import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
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
import { InterviewsService } from 'src/app/modules/interviews/services/interviews.service';
import { Router } from '@angular/router';

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
  @Input() loading = false;
  @Output() qualifiedInterview = new EventEmitter();

  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  session = inject(SessionService);
  interviewService = inject(InterviewsService);
  router = inject(Router);
  displayDialog = false;
  currentInterview!: Interview;
  comment!: string;
  columns!: string[];
  showConfirmDialog = false;
  showInterviewInformation = false;
  score = 1;
  selectedInterview!: Interview;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
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
      calificacion: ['', [Validators.required, Validators.maxLength(2)]],
      comentario: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  handleClick(event: any, interview: Interview) {
    this.currentInterview = interview;
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

  validForm() {
    return this.registerForm.value['comentario'].length > 0 && this.score > 0;
  }

  addData() {
    this.interviewService
      .qualifyInterview({
        calificacion: this.score,
        comentario: this.registerForm.value['comentario'],
        id: this.currentInterview.id,
      })
      .subscribe({
        next: (res) => {
          this.registerForm.reset();
          this.showInterviewInformation = false;
          this.showConfirmDialog = false;
          this.qualifiedInterview.emit(true);
        },
      });
  }
}
