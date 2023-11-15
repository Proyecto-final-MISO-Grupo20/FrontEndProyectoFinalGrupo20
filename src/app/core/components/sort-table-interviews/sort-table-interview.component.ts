import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockData_interview } from 'src/app/modules/interviews/utils/mock-data-interviews';

@Component({
  selector: 'app-sort-table-interview',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule],
  templateUrl: './sort-table-interview.component.html',
  styleUrls: ['./sort-table-interview.component.scss'],
})
export class SortTableInterviewComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];
  @Input() mockData_interview!: any[];
  

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
    this.mockData_interview = mockData_interview;
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
}
