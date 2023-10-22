import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-projects-create',
  standalone: true,
  imports: [CommonModule, LanguageModule],
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss'],
})
export class ProjectsCreateComponent {}
