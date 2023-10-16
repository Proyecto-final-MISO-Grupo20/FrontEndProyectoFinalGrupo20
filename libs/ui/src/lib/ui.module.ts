import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { StepsComponent } from './components/steps/steps.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    StepsModule,
    StepsComponent,
  ],
  exports: [
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    StepsModule,
    StepsComponent,
  ],
})
export class UiModule {}
