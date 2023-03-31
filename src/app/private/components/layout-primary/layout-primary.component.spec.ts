import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPrimaryComponent } from './layout-primary.component';

describe('LayoutPrimaryComponent', () => {
  let component: LayoutPrimaryComponent;
  let fixture: ComponentFixture<LayoutPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPrimaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
