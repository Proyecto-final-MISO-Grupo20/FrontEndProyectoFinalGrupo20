import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortTableInterviewComponent } from './sort-table-interview.component';

describe('SortTableComponent', () => {
  let component: SortTableInterviewComponent;
  let fixture: ComponentFixture<SortTableInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortTableInterviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortTableInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
