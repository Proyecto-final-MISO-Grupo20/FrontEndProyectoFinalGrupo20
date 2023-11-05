import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { TechnicalHabilitiesComponent } from '../technical-habilities/technical-habilities.component';
import { TechnicalToolsComponent } from '../technical-tools/technical-tools.component';

@Component({
  selector: 'app-technical-data',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    LanguageModule,
    TechnicalHabilitiesComponent,
    TechnicalToolsComponent,
  ],
  templateUrl: './technical-data.component.html',
  styleUrls: ['./technical-data.component.scss'],
})
export class TechnicalDataComponent {}
