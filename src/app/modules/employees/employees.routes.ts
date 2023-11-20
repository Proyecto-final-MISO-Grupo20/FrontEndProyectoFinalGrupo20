import { Route } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeesCreateComponent } from './pages/employees-create/employees-create.component';

export const employeesRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Employees',
    component: EmployeesComponent,
  },

  {
    path: 'create',
    title: 'ABC Jobs | Employees Create',
    component: EmployeesCreateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
