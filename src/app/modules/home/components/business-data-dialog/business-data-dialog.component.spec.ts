import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessDataViewComponent } from './business-data-view.component';

describe('BusinessDataViewComponent', () => {
  let component: BusinessDataViewComponent;
  let fixture: ComponentFixture<BusinessDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessDataViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
