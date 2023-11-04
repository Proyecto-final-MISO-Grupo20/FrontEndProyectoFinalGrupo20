import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-technical-data',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule],
  templateUrl: './technical-data.component.html',
  styleUrls: ['./technical-data.component.scss'],
})
export class TechnicalDataComponent {}
