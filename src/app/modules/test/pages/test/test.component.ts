import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SortTableTestComponent } from 'src/app/core/components/sort-table-test/sort-table-test.component';
import { TestsService } from '../../services/tests.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableTestComponent, UiModule],
  providers: [TestsService],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  applicationsService = inject(TestsService);
  createdApplication!: string | null;
  successCreate = false;
  tests!: any[];
  successCreateApplication!: string | null;

  ngOnInit(): void {
    this.getApplications();
    this.setSuccessCreated();
    this.setSucessCreatedOffer();
  }

  getApplications() {
    this.applicationsService
      .getTests()
      .pipe(
        tap((tests) => {
          tests.forEach((test: any) => {
            test.profiles = [];
          });

          this.tests = tests;
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
