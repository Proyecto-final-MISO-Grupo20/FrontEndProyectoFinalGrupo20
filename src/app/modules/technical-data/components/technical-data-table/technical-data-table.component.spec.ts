import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalDataTableComponent } from './technical-data-table.component';

describe('TechnicalDataTableComponent', () => {
  let component: TechnicalDataTableComponent;
  let fixture: ComponentFixture<TechnicalDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalDataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
