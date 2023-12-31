import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  @Input() itemList!: string[];
  session = inject(SessionService);

  // Responsive
  isMobile!: boolean;

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth <= 1115;
  }

  logout() {
    this.session.logout();
  }
}
