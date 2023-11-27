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
import { ApplicationsService } from '../../../modules/applications/services/applications.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-table-applications',
  standalone: true,
  providers: [MessageService],
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
  applicationsService = inject(ApplicationsService);
  messageService = inject(MessageService);
  router = inject(Router);
  buttonLoading: boolean = false;
  selectedCandidate!: CandidatesSkills;

  columns!: string[];
  showConfirmDialog = false;
  currentCandidateTools!: any;
  showHireDialog = false;
  date: Date[] | undefined;

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
      fecha_inicio: ['', Validators.required],
      meses: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      valor: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  setShowConfirmDialog(show: boolean, candidate: CandidatesSkills) {
    this.showConfirmDialog = show;

    this.currentCandidateTools = this.getSkills(candidate);
  }

  setShowHireDialog(show: boolean, candidate: CandidatesSkills) {
    this.selectedCandidate = candidate;
    this.showHireDialog = show;
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
    this.showHireDialog = false;
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

  onSubmit() {
    this.buttonLoading = true;

    this.applicationsService
      .createContract(this.urlId, {
        ...this.registerForm.value,
        candidato_id: this.selectedCandidate.id,
      })
      .subscribe({
        next: (res) => {
          this.show('success', 'Contrato', 'Se realizó el contrato');

          this.router.navigateByUrl(`offers/${this.urlId}`);

          this.buttonLoading = false;
        },
        error: (err) => {
          this.show(
            'error',
            'Contrato',
            'Ocurrió un error al realizar el contrato'
          );

          this.buttonLoading = false;
        },
        complete: () => (this.buttonLoading = false),
      });
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
