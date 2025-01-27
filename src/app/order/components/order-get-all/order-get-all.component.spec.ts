import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGetAllComponent } from './order-get-all.component';

describe('OrderGetAllComponent', () => {
  let component: OrderGetAllComponent;
  let fixture: ComponentFixture<OrderGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
