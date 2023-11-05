import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-technical-tools',
  standalone: true,
  imports: [CommonModule, LanguageModule],
  templateUrl: './technical-tools.component.html',
  styleUrls: ['./technical-tools.component.scss'],
})
export class TechnicalToolsComponent {}
