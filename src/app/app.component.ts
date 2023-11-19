import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageModule } from 'language';
import { HeaderComponent } from './core/components/header/header/header.component';
import { CommonModule, Location } from '@angular/common';
import { SessionService } from './core/services/session/session.service';
import { Roles } from './core/utils/roles.enum';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageModule, HeaderComponent],
  providers: [TranslocoService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  location = inject(Location);
  session = inject(SessionService);

  urlChange$!: VoidFunction;
  isAuthRoute = false;

  get headerList(): string[] {
    return this.session.getUser().rol === Roles.BUSINESS
      ? this.getHeaderBusinessList()
      : this.getHeaderCandidateList();
  }

  ngOnInit(): void {
    this.urlChange$ = this.location.onUrlChange(
      (url) => (this.isAuthRoute = url.includes('auth'))
    );

    this.getHeaderBusinessList();
  }

  getHeaderBusinessList() {
    return ['home', 'projects', 'interviews', 'tests', 'employees'];
  }

  getHeaderCandidateList() {
    return ['home', 'technical-data', 'interviews'];
  }
}
