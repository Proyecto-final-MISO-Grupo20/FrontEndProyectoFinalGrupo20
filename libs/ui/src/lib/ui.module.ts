import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
  ],
  exports: [DropdownModule, ButtonModule, InputTextModule, CalendarModule],
})
export class UiModule {}
