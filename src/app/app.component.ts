import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageModule } from 'language';
import { HeaderComponent } from './core/components/header/header/header.component';
import { CommonModule, Location } from '@angular/common';

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
  urlChange$!: VoidFunction;
  isAuthRoute = false;
  headerBusinessList!: string[];

  ngOnInit(): void {
    this.urlChange$ = this.location.onUrlChange(
      (url) => (this.isAuthRoute = url.includes('auth'))
    );

    this.getHeaderBusinessList();
  }

  getHeaderBusinessList() {
    this.headerBusinessList = [
      'home',
      'projects',
      'interviews',
      'tests',
      'employees',
    ];
  }
}
