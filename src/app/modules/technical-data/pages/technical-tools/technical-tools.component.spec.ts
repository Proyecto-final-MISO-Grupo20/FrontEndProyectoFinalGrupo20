import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalToolsComponent } from './technical-tools.component';

describe('TechnicalToolsComponent', () => {
  let component: TechnicalToolsComponent;
  let fixture: ComponentFixture<TechnicalToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
