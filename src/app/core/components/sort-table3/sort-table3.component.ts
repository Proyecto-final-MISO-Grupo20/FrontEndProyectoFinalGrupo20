import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { RatingModule } from 'primeng/rating';
import { LanguageModule } from 'language';
import { IncrementalStateKind } from '@angular/compiler-cli/src/ngtsc/incremental';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AssignSkill } from 'src/app/modules/profiles/dtos/create-offer.dto';

@Component({
  selector: 'app-sort-table3',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sort-table3.component.html',
  styleUrls: ['./sort-table3.component.scss'],
})
export class SortTable3Component implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() dialogData!: any[];
  data: AssignSkill[] = [];
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  columns!: string[];
  showConfirmDialog = false;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};
  toolDomain = 1;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.setColumns();
    this.checkScreenWidth();
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      toolName: ['', Validators.required],
    });
  }

  setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
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
    this.toolDomain = this.toolDomain + 1;
  }
  decrease() {
    this.toolDomain = this.toolDomain - 1;
  }

  addData() {
    console.log(this.registerForm.value, this.toolDomain);
    this.data.push({
      skillName: this.registerForm.value.toolName.nombre,
      skill_id: this.registerForm.value.toolName.id,
      dominio: this.toolDomain,
    });

    this.setColumns();

    this.setShowConfirmDialog(false);
    this.registerForm.reset();
    this.toolDomain = 1;
  }

  deleteData(data: any) {
    const index = this.data.findIndex(
      (tool) => data.skill_id === tool.skill_id
    );

    this.data.splice(index, 1);
  }
}
