/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators'; // Importa 'operators' para usar tap
import { LanguageModule } from 'language';
import { ProfilesService } from '../../services/profiles.service';
import { SortTable3Component } from 'src/app/core/components/sort-table3/sort-table3.component';
import { SortTable4Component } from 'src/app/core/components/sort-table4/sort-table4.component';
import { SortTable5Component } from 'src/app/core/components/sort-table5/sort-table5.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UiModule } from 'ui';
import { PartialSkillsService } from '../../services/partial-skills/partial-skills.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LanguageModule,
    ReactiveFormsModule,
    UiModule,
    SortTable3Component,
    SortTable4Component,
    SortTable5Component,
  ],
})
export class ProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profilesService: ProfilesService
  ) {}

  profileForm!: FormGroup;
  showConfirmDialog = false;
  tools: any[] = [];
  skills: any[] = [];
  languages: any[] = [];
  error: string | null = null;
  partialSkillsService = inject(PartialSkillsService);

  ngOnInit(): void {
    this.getTools();
    this.initializeForm();
    this.getSkills();
    this.getLanguages();
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
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

  getTools() {
    this.profilesService
      .getTools()
      .pipe(tap((tools) => (this.tools = tools)))
      .subscribe();
  }
  getSkills() {
    this.profilesService
      .getSkills()
      .pipe(tap((skills) => (this.skills = skills)))
      .subscribe();
  }
  getLanguages() {
    this.profilesService
      .getLanguages()
      .pipe(tap((languages) => (this.languages = languages)))
      .subscribe();
  }

  createProfile() {
    console.log(this.partialSkillsService.getPartialTools(), 'partial tools');
  }
}
