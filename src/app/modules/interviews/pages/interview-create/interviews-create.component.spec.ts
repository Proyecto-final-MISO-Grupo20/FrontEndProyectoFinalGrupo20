import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewsCreateComponent } from './interviews-create.component';


describe('InterviewsCreateComponent', () => {
  let component: InterviewsCreateComponent;
  let fixture: ComponentFixture<InterviewsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewsCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
