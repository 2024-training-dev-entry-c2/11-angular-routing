import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { IDishResponse } from '../dish/interfaces/dish.interface';
import { ICustomerResponse } from '../customer/interfaces/customer.interface';
import {
  IDetail,
  IOrder,
  IOrderRequestDTO,
  IOrderResponse,
} from '../order/interfaces/order.interface';
import { CreateOrderService } from '../order/services/create-order.service';

@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private createOrderService = inject(CreateOrderService);
  faX = faX;
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public orderSaved = new EventEmitter<IOrderResponse>();

  public client: ICustomerResponse | null = null;
  public dishes: IDishResponse[] = [];
  public quantities: number[] = [];

  ngOnInit(): void {
    this.client =
      JSON.parse(sessionStorage.getItem('client') as string) || null;
    this.dishes = JSON.parse(sessionStorage.getItem('dishes') as string) || [];
    for (let i = 0; i < this.dishes.length; i++) {
      this.quantities.push(1);
    }
  }

  close() {
    this.closeModal.emit();
  }

  increment(index: number): void {
    this.quantities[index]++;
  }

  decrement(index: number): void {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }

  saveOrder(): void {
    const orderRequestDTO: IOrderRequestDTO = {
      clientId: this.client!.id,
      status: 'PROCESSING',
    };
    const orderDetails: IDetail[] = [];
    for (let i = 0; i < this.dishes.length; i++) {
      orderDetails.push({
        quantity: this.quantities[i],
        dishId: this.dishes[i].id,
      });
    }
    const order: IOrder = {
      orderRequestDTO: orderRequestDTO,
      details: orderDetails,
    };
    this.createOrderService.execute(order).subscribe((order) => {
      this.client = null;
      this.dishes = [];
      this.quantities = [];
      sessionStorage.setItem('client', JSON.stringify(null));
      sessionStorage.setItem('dishes', JSON.stringify([]));
      this.orderSaved.emit(order);
      this.closeModal.emit();
    });
  }
}
