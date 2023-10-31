import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { LanguageModule } from 'language';
import { ProfilesService } from '../../services/profiles.service';
import { SortTableComponent } from '../../../../core/components/sort-table3/sort-table3.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LanguageModule, SortTableComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profiles!: any[];
  profileService = inject(ProfilesService);

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.profileService
      .getProfiles()
      .pipe(tap((profiles) => (this.profiles = profiles)))
      .subscribe();
  }
}
