import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import { LanguageModule } from 'language';
import { SessionService } from '../../../../core/services/session/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UiModule, LanguageModule],
  providers: [SessionService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() itemList!: string[];
  session = inject(SessionService);

  logout() {
    this.session.logout();
  }
}
