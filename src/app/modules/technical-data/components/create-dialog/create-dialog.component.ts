import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'ui';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [CommonModule, UiModule, ReactiveFormsModule],
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit {
  @Input() visible = false;
  @Input() data!: any[];

  @Output() assignTool = new EventEmitter<any>();

  createForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createForm = this.formBuilder.group({
      skill: ['', [Validators.required]],
      dominio: ['', Validators.required],
    });
  }

  onBeforeDialogHide() {
    this.visible = false;
  }

  assign() {
    this.assignTool.emit(this.createForm.value);
    this.createForm.reset();
  }
}