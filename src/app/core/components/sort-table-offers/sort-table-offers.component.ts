import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { Offer } from '../../models/offer.model';
import { OfferState } from '../../../modules/offers/utils/offer-state.enum';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sort-table-offers',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sort-table-offers.component.html',
  styleUrls: ['./sort-table-offers.component.scss'],
})
export class SortTableOffersComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  @Input() loading = false;

  columns!: string[];
  performanceDialogVisible = false;

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};

  gradeForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  get offersState() {
    return OfferState;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.setColumns();
    this.checkScreenWidth();
    this.initializeForm();
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

  ngOnChanges() {
    this.setColumns();
  }

  setColumns() {
    if (this.data && this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
  }

  getSeverity(offer: Offer) {
    const offerSeverity: any = {
      [OfferState.DISPONIBLE]: 'success',
      [OfferState.ASIGNADO]: 'primary',
      [OfferState.CONTRATADO]: 'warning',
      [OfferState.EVALUANDO]: 'info',
      [OfferState.FINALIZADO]: 'danger',
    };

    return offerSeverity[offer.estado];
  }

  showAssignPerformanceDialog() {
    this.performanceDialogVisible = true;
  }

  initializeForm() {
    this.gradeForm = this.formBuilder.group({
      comment: ['', Validators.required],
      grade: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.gradeForm.value);
  }
}
