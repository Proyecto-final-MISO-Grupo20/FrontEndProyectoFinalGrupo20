import { Component, Input, OnInit, inject } from '@angular/core';
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
import { InterviewsService } from '../../services/interviews.service';
import { SessionService } from '../../../../core/services/session/session.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SortTableParticipantsComponent } from 'src/app/core/components/sort-table-participants/sort-table-participants.component';

@Component({
    selector: 'app-interviews-create',
    standalone: true,
    templateUrl: './interviews-create.component.html',
    styleUrls: ['./interviews-create.component.scss'],
    imports: [CommonModule, LanguageModule, ReactiveFormsModule, UiModule, SortTableParticipantsComponent]
})
export class InterviewsCreateComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  interviewsService = inject(InterviewsService);
  session = inject(SessionService);

  interviewCreateForm!: FormGroup;
  showConfirmDialog = false;
  loading = false;
  errorMessage!: string | undefined;
  participants!: any[];

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.interviewCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      date: ['', Validators.maxLength(200)],
      candidates: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit() {
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToInterviews() {
    this.router.navigateByUrl('/interviews');
  }
}


