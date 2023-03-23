import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpListComponent } from './help-list.component';

describe('HelpListComponent', () => {
  let component: HelpListComponent;
  let fixture: ComponentFixture<HelpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
