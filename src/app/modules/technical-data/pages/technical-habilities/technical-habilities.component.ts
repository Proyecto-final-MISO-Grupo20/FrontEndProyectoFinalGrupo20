import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-technical-habilities',
  standalone: true,
  imports: [CommonModule, LanguageModule],
  templateUrl: './technical-habilities.component.html',
  styleUrls: ['./technical-habilities.component.scss'],
})
export class TechnicalHabilitiesComponent {}
