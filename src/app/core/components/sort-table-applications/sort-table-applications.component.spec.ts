import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortTableapplicationsComponent } from './sort-table-applications.component';


describe('SortTableComponent', () => {
  let component: SortTableapplicationsComponent;
  let fixture: ComponentFixture<SortTableapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortTableapplicationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortTableapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
