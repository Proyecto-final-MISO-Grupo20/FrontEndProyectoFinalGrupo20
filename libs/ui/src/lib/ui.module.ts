import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { StepsComponent } from './components/steps/steps.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    StepsModule,
    StepsComponent,
    TableModule,
    InputTextareaModule,
    DialogModule,
    AccordionModule,
    DataViewModule,
    RatingModule,
    TagModule,
    RatingModule,
    CardModule,
    CheckboxModule,
    ProgressSpinnerModule,
    TooltipModule,
  ],
  exports: [
    DropdownModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    CalendarModule,
    StepsModule,
    StepsComponent,
    TableModule,
    InputTextareaModule,
    DialogModule,
    AccordionModule,
    DataViewModule,
    RatingModule,
    TagModule,
    RatingModule,
    CardModule,
    CheckboxModule,
    ProgressSpinnerModule,
    TooltipModule,
  ],
})
export class UiModule {}
