import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalHabilitiesComponent } from './technical-habilities.component';

describe('TechnicalHabilitiesComponent', () => {
  let component: TechnicalHabilitiesComponent;
  let fixture: ComponentFixture<TechnicalHabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalHabilitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalHabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
