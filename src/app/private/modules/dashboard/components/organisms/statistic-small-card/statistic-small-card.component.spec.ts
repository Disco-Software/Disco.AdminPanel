import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSmallCardComponent } from './statistic-small-card.component';

describe('StatisticSmallCardComponent', () => {
  let component: StatisticSmallCardComponent;
  let fixture: ComponentFixture<StatisticSmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticSmallCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
