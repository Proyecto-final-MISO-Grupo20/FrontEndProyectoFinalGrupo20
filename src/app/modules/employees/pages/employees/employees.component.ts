import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTable2Component } from '../../../../core/components/sort-table2/sort-table2.component';
import { EmployeesService } from '../../services/employees.service';
import { Observable, filter, tap } from 'rxjs';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTable2Component],
  providers: [EmployeesService],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees!: any[];
  employeesService = inject(EmployeesService);
  loading = false;

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true;

    this.employeesService
      .getEmployees()
      .pipe(
        filter((employee) => !!employee),
        tap((employees) => {
          employees.forEach((employee: any) => {
            delete employee.empresaId;
            delete employee.id;
            delete employee.tipo_documento;
          });
          this.employees = employees;

          this.loading = false;
        })
      )
      .subscribe();
  }
}
