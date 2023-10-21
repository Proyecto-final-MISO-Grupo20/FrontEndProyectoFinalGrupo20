import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() itemList!: string[];
}
