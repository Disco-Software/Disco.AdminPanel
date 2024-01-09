import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCodeModalComponent } from './password-code-modal.component';

describe('PasswordCodeModalComponent', () => {
  let component: PasswordCodeModalComponent;
  let fixture: ComponentFixture<PasswordCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordCodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
