import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-sort-table-test',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule],
  templateUrl: './sort-table-test.component.html',
  styleUrls: ['./sort-table-test.component.scss'],
})
export class SortTableTestComponent implements OnInit {
  // Input data
  @Input() header!: string;
  @Input() data!: any[];

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
