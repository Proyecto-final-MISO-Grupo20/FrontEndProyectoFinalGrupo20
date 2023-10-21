import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterBusinessFormComponent } from './register-business-form.component';

describe('RegisterBussinessFormComponent', () => {
  let component: RegisterBusinessFormComponent;
  let fixture: ComponentFixture<RegisterBusinessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBusinessFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterBusinessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
