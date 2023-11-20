import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilCardComponent } from './util-card.component';

describe('UtilCardComponent', () => {
  let component: UtilCardComponent;
  let fixture: ComponentFixture<UtilCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UtilCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
