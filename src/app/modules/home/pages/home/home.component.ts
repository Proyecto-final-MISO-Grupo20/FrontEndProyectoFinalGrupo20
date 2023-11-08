import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHomeComponent } from '../business-home/business-home.component';
import { SessionService } from 'src/app/core/services/session/session.service';
import { Roles } from 'src/app/core/utils/roles.enum';
import { CandidateHomeComponent } from '../candidate-home/candidate-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BusinessHomeComponent, CandidateHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userRole!: Roles;
  session = inject(SessionService);

  get roles() {
    return Roles;
  }

  ngOnInit(): void {
    this.userRole = this.session.getUser().rol;
  }
}
