import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule } from 'language';
import { CreateTestService } from '../../services/create-test.service';
import { tap } from 'rxjs';
import { Keys } from '../../../../core/utils/keys';
import { UiModule } from 'ui';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-createTest',
  standalone: true,
  imports: [CommonModule, LanguageModule, UiModule, CreateTestComponent, ReactiveFormsModule],
  providers: [CreateTestService],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})


export class CreateTestComponent implements OnInit {
  createTestService = inject(CreateTestService  );
   @Input() header!: string;
   @Input() data!: any[];
   resultsForm!: FormGroup;
   formBuilder = inject(FormBuilder);
   showConfirmDialog = false;
   
   setShowConfirmDialog(show: boolean) {
    this.showConfirmDialog = show;
  }

   ngOnInit(): void {
    this.getcreateTest();
    this.initializeForm();
  }

  initializeForm() {
    this.resultsForm = this.formBuilder.group({
    });
  }

  getcreateTest() {
    this.createTestService
      .getcreateTest()
      
      .subscribe();
  }

  addData() {
    console.log(this.resultsForm.value);
    this.setShowConfirmDialog(false);
    this.resultsForm.reset();

  }
  
  
}
