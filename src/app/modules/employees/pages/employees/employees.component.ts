import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTableComponent } from '../../../../core/components/sort-table/sort-table.component';
import { EmployeesService } from '../../services/employees.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableComponent],
  providers: [EmployeesService],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees!: any[];
  employeesService = inject(EmployeesService);

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesService
      .getEmployees()
      .pipe(tap((employees) => (this.employees = employees)))
      .subscribe();
  }
}
