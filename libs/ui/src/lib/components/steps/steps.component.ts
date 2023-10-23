import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'lib-steps',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, StepsModule],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {
  @Input() items!: MenuItem[] | undefined;
  @Input() activeIndex = 0;
  messageService = inject(MessageService);

  ngOninit() {
    this.items?.map(
      (item) =>
        (item.command = (event: any) =>
          this.messageService.add({
            severity: 'info',
            summary: 'First Step',
            detail: event.item.label,
          }))
    );
  }
}
