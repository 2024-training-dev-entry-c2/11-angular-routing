import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionOrdersComponent } from './main-section-orders.component';

describe('MainSectionOrdersComponent', () => {
  let component: MainSectionOrdersComponent;
  let fixture: ComponentFixture<MainSectionOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
