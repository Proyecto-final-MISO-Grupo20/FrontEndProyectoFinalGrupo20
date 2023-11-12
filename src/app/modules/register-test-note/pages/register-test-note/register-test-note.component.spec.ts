import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerTestNoteComponent } from './register-test-note.component';

describe('registerTestNoteComponent', () => {
  let component: registerTestNoteComponent;
  let fixture: ComponentFixture<registerTestNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [registerTestNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(registerTestNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
