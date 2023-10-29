import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { SortTableComponent } from '../../../../core/components/sort-table3/sort-table3.component';
import { ProfilesService } from '../../services/profiles.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableComponent],
  providers: [ProfilesService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfilesComponent implements OnInit {
  profiles!: any[];
  profilesService = inject(ProfilesService);

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this.profilesService
      .getProfiles()
      //.pipe(tap((profiles) => (this.profiles = profiles)))
     // .subscribe();
  }
}
