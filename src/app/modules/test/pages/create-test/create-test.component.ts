import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { UiModule } from 'ui';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CreateTestDto } from '../../dtos/create-test.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [
    CommonModule,
    LanguageModule,
    UiModule,
    CreateTestComponent,
    ReactiveFormsModule,
  ],
  providers: [TestsService],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
  testService = inject(TestsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  resultsForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  showConfirmDialog = false;
  offerId!: number;

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  ngOnInit(): void {
    this.offerId = this.activatedRoute.snapshot.params['offerId'];
    this.initializeForm();
  }

  initializeForm() {
    this.resultsForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],],
      comentario: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ],],
      calificacion: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
      ],],
    });
  }

  onSubmit() {
    const data: CreateTestDto = {
      ...this.resultsForm.value,
      tipo: 1,
      postulacionId: this.offerId,
    };

    this.testService.createTest(data).subscribe({
      next: (res) => {
        this.router.navigateByUrl(`test/${this.offerId}`);
      },
      error: (err) => console.error(err),
    });
  }

  return() {
    this.router.navigateByUrl(`test/${this.offerId}`);
  }
}
