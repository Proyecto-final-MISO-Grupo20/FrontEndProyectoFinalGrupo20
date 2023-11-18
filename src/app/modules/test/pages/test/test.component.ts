import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTableTestComponent } from '../../../../core/components/sort-table-test/sort-table-test.component';
import { TestsService } from '../../services/tests.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';
import { ActivatedRoute } from '@angular/router';

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
  activatedRoute = inject(ActivatedRoute);

  createdApplication!: string | null;
  successCreate = false;
  tests!: any[];
  successCreateApplication!: string | null;
  offerId!: number;

  ngOnInit(): void {
    this.offerId = this.activatedRoute.snapshot.params['offerId'];

    this.getApplications();
    this.setSuccessCreated();
    this.setSucessCreatedOffer();
  }

  getApplications() {
    this.applicationsService
      .getTests(this.offerId)
      .pipe(
        tap((tests) => {
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
    this.successCreateApplication = localStorage.getItem(
      Keys.CREATE_OFFER_COMPLETE
    );

    setTimeout(() => (this.successCreateApplication = null), 3000);

    localStorage.removeItem(Keys.CREATE_OFFER_COMPLETE);
  }
}
