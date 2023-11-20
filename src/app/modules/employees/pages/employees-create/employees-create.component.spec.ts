import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesCreateComponent } from './employees-create.component';

describe('EmployeessCreateComponent', () => {
  let component: EmployeesCreateComponent;
  let fixture: ComponentFixture<EmployeesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
