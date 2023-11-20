import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalDataComponent } from './technical-data.component';

describe('TechnicalDataComponent', () => {
  let component: TechnicalDataComponent;
  let fixture: ComponentFixture<TechnicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
