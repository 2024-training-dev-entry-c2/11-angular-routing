import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionStatsComponent } from './main-section-stats.component';

describe('MainSectionStatsComponent', () => {
  let component: MainSectionStatsComponent;
  let fixture: ComponentFixture<MainSectionStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
