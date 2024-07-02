import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedButtonComponent } from './formatted-button.component';

describe('FormattedButtonComponent', () => {
  let component: FormattedButtonComponent;
  let fixture: ComponentFixture<FormattedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormattedButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormattedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
