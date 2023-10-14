import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, DropdownModule, ButtonModule, InputTextModule],
  exports: [DropdownModule, ButtonModule, InputTextModule],
})
export class UiModule {}
