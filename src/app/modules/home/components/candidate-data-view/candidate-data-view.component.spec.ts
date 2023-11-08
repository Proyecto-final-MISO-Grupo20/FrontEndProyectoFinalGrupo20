import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateDataViewComponent } from './candidate-data-view.component';

describe('CandidateDataViewComponent', () => {
  let component: CandidateDataViewComponent;
  let fixture: ComponentFixture<CandidateDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateDataViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
