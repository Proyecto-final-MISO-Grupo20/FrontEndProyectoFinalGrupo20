import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageModule } from 'language';

@Component({
  standalone: true,
  imports: [RouterModule, LanguageModule],
  providers: [TranslocoService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
