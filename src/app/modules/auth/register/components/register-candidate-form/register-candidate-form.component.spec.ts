import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCandidateFormComponent } from './register-candidate-form.component';

describe('RegisterCandidateFormComponent', () => {
  let component: RegisterCandidateFormComponent;
  let fixture: ComponentFixture<RegisterCandidateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCandidateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
