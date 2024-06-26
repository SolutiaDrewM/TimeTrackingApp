import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTInputComponent } from './tt-input.component';

describe('TTInputComponent', () => {
  let component: TTInputComponent;
  let fixture: ComponentFixture<TTInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TTInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TTInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
