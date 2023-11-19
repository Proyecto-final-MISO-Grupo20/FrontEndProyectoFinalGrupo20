import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
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
import { CandidatesSkills } from './../../../modules/home/models/candidates-skills';
import { SkillType } from '../../../modules/technical-data/models/skills';

@Component({
  selector: 'app-sort-table-applications',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sort-table-applications.component.html',
  styleUrls: ['./sort-table-applications.component.scss'],
})
export class SortTableapplicationsComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  @Input() loading = false;
  @Input() urlId!: number;

  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  columns!: string[];
  showConfirmDialog = false;
  currentCandidateTools!: any;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
  skillType!: string;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  get skillTypeEnum() {
    return SkillType;
  }

  ngOnInit(): void {
    this.setColumns();
    this.checkScreenWidth();
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      skillName: ['', Validators.required],
      skillType: ['', Validators.required],
    });
  }

  setShowConfirmDialog(show: boolean, candidate: CandidatesSkills) {
    this.showConfirmDialog = show;

    this.currentCandidateTools = this.getSkills(candidate);
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
  returnToApplications() {
    this.showConfirmDialog = false;
  }

  ngOnChanges() {
    this.setColumns();
  }

  getSkills(candidate: CandidatesSkills) {
    const result = {
      [SkillType.HABILIDAD]: candidate.skills.filter(
        ({ skill }) => skill?.tipo === SkillType.HABILIDAD
      ),
      [SkillType.HERRAMIENTA]: candidate.skills.filter(
        ({ skill }) => skill?.tipo === SkillType.HERRAMIENTA
      ),
      [SkillType.IDIOMA]: candidate.skills.filter(
        ({ skill }) => skill?.tipo === SkillType.IDIOMA
      ),
    };

    console.log(result);
    return result;
  }
}
