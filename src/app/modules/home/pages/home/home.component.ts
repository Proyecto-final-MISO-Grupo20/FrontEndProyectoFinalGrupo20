import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHomeComponent } from '../business-home/business-home/business-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BusinessHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
