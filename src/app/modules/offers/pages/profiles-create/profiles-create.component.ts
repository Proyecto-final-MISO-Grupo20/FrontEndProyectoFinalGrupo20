import { Component, OnInit, inject } from '@angular/core';
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

@Component({
  selector: 'app-profiles-create',
  standalone: true,
  imports: [CommonModule, LanguageModule, ReactiveFormsModule, UiModule],
  templateUrl: './profiles-create.component.html',
  styleUrls: ['./profiles-create.component.scss'],
})
export class ProfilesCreateComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  profilesCreateForm!: FormGroup;
  showConfirmDialog = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.profilesCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', Validators.maxLength(200)],
      code: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  onSubmit() {
    console.log(this.profilesCreateForm.value);
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToProjects() {
    this.router.navigateByUrl('/projects');
  }
}
