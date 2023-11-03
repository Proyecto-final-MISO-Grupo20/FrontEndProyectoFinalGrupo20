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
import { ProjectsService } from '../../services/projects.service';
import { SessionService } from '../../../../core/services/session/session.service';
import { Keys } from '../../../../core/utils/keys';

@Component({
  selector: 'app-projects-create',
  standalone: true,
  imports: [CommonModule, LanguageModule, ReactiveFormsModule, UiModule],
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss'],
})
export class ProjectsCreateComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  projectsService = inject(ProjectsService);
  session = inject(SessionService);

  projectCreateForm!: FormGroup;
  showConfirmDialog = false;
  loading = false;
  errorMessage!: string | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.projectCreateForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(25)]],
      descripcion: ['', Validators.maxLength(200)],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.projectsService.createProject(this.projectCreateForm.value).subscribe({
      next: (res) => {
        localStorage.setItem(
          Keys.CREATE_PROJECT_COMPLETE,
          this.projectCreateForm.value.nombre
        );
        this.router.navigateByUrl('/projects');
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error.error;

        setTimeout(() => (this.errorMessage = undefined), 3000);
      },
      complete: () => (this.loading = false),
    });
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToProjects() {
    this.router.navigateByUrl('/projects');
  }
}
