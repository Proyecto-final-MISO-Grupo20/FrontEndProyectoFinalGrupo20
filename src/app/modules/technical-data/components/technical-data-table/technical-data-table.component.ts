import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-technical-data-table',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './technical-data-table.component.html',
  styleUrls: ['./technical-data-table.component.scss'],
})
export class TechnicalDataTableComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  @Input() tooltipData!: any[];
  @Input() emptyMessage = 'technical-data.empty';
  @Input() loading = false;

  @Output() showConfirmDialog = new EventEmitter<boolean>();

  columns!: string[];

  // Responsive
  isMobile!: boolean;
  tableStyle: { [key: string]: string } = {};

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.setColumns();
    this.checkScreenWidth();
  }

  ngOnChanges() {
    this.setColumns();
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

  setShowConfirmDialog(visible: boolean) {
    this.showConfirmDialog.emit(visible);
  }
}
