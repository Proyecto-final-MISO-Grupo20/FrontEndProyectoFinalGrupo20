import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortTable5Component } from './sort-table5.component';

describe('SortTable5Component', () => {
  let component: SortTable5Component;
  let fixture: ComponentFixture<SortTable5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortTable5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SortTable5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
