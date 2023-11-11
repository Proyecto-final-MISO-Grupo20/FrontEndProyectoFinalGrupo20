import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SortTableapplicationsComponent } from 'src/app/core/components/sort-table-applications/sort-table-applications.component';
import { ApplicationsService } from '../../services/applications.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableapplicationsComponent, UiModule],
  providers: [ApplicationsService],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  applicationsService = inject(ApplicationsService);
  createdApplication!: string | null;
  successCreate = false;
  applications!: any[];
  successCreateApplication!: string | null;

  ngOnInit(): void {
    this.getApplications();
    this.setSuccessCreated();
    this.setSucessCreatedOffer();
  }

  getApplications() {
    this.applicationsService
      .getApplications()
      .pipe(
        tap((applications) => {
          applications.forEach((application: any) => {
            application.profiles = [];
          });

          this.applications = applications;
        })
      )
      .subscribe();
  }

  setSuccessCreated() {
    this.createdApplication = localStorage.getItem(Keys.CREATE_OFFER_COMPLETE);

    if (this.createdApplication) {
      this.successCreate = true;

      setTimeout(() => (this.successCreate = false), 3000);
      localStorage.removeItem(Keys.CREATE_OFFER_COMPLETE);
    }
  }

  setSucessCreatedOffer() {
    this.successCreateApplication = localStorage.getItem(Keys.CREATE_OFFER_COMPLETE);

    setTimeout(() => (this.successCreateApplication = null), 3000);

    localStorage.removeItem(Keys.CREATE_OFFER_COMPLETE);
  }
}
