import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators'; // Importa 'operators' para usar tap
import { LanguageModule } from 'language';
import { ProfilesService } from '../../services/profiles.service';
import { SortTableComponent } from '../../../../core/components/sort-table3/sort-table3.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiModule } from 'ui';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [CommonModule, LanguageModule, ReactiveFormsModule, UiModule, SortTableComponent]
})

export class ProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profilesService: ProfilesService
  ) {}

  profileForm!: FormGroup;
  showConfirmDialog = false;
  profiles: any[] = [];
  error: string | null = null;

  // Event
  @Output() backToMainForm = new EventEmitter<void>();

  get profileFormValid(): boolean | undefined {
    const step1Validation = this.profileForm.get('name')?.valid;
    return step1Validation;
  }

  ngOnInit(): void {
    this.getProfiles();
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]],
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

  returnToProjects() {
    this.router.navigateByUrl('/projects');
  }

  getProfiles() {
    this.profilesService
      .getProfiles()
      .pipe(tap((profiles) => (this.profiles = profiles)))
      .subscribe();
  }
}
