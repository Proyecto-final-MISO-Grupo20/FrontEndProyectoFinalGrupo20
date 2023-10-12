import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, LanguageModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {}
