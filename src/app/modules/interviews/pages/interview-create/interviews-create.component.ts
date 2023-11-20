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
import { BusinessHomeService } from '../../../../modules/home/services/business-home/business-home.service';
import { tap } from 'rxjs';
import { CreateInterviewDto } from '../../dto/create-interview.dto';

@Component({
  selector: 'app-interviews-create',
  standalone: true,
  templateUrl: './interviews-create.component.html',
  styleUrls: ['./interviews-create.component.scss'],
  imports: [
    CommonModule,
    LanguageModule,
    ReactiveFormsModule,
    UiModule,
    SortTableParticipantsComponent,
  ],
})
export class InterviewsCreateComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  interviewsService = inject(InterviewsService);
  session = inject(SessionService);
  businessHomeService = inject(BusinessHomeService);

  interviewCreateForm!: FormGroup;
  showConfirmDialog = false;
  loading = false;
  errorMessage!: string | undefined;
  participants!: any[];
  candidatesData!: any[];

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};

  ngOnInit(): void {
    this.initializeForm();
    this.getCandidates();
  }

  formValid() {
    return (
      this.interviewCreateForm.valid &&
      this.participants &&
      this.participants.length > 0
    );
  }

  initializeForm() {
    this.interviewCreateForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      fecha: ['', Validators.required],
    });
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToInterviews() {
    this.router.navigateByUrl('/interviews');
  }

  getCandidates() {
    this.businessHomeService
      .getCandidates()
      .pipe(tap((candidates) => (this.candidatesData = candidates)))
      .subscribe();
  }

  createInterview() {
    const participantsIdArray = this.participants.map(
      (participant) => participant.id
    );

    this.interviewsService
      .createInterview({
        ...this.interviewCreateForm.value,
        usuarios: participantsIdArray,
      })
      .subscribe({
        next: (res) => this.router.navigateByUrl('interviews'),
      });
  }
}
