import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalLanguagesComponent } from './technical-languages.component';

describe('TechnicalLanguagesComponent', () => {
  let component: TechnicalLanguagesComponent;
  let fixture: ComponentFixture<TechnicalLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalLanguagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
