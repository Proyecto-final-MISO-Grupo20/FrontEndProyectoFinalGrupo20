import { Component, NgModule, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageModule } from 'language';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [RouterModule, LanguageModule],
  providers: [TranslocoService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}


@NgModule({

  imports: [BrowserModule, HttpClientModule],
})
export class AppModule {}

