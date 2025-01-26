import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGetByIdComponent } from './order-get-by-id.component';

describe('OrderGetByIdComponent', () => {
  let component: OrderGetByIdComponent;
  let fixture: ComponentFixture<OrderGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderGetByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
