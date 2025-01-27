import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../../shared/modal/modal.component';
import { OrderService } from '../../core/services/order.service';
import { Iorder, Iorders } from '../../interfaces/order/order';
import { DatePipe, JsonPipe } from '@angular/common';
import { OrderCreateComponent } from '../../shared/orders/order-create/order-create.component';

@Component({
  selector: 'app-orders',
  imports: [MatIconModule, ModalComponent, JsonPipe, OrderCreateComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  public orders: Iorder[] = [];
  isModalFormOrder = false;
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.orders.subscribe((orders) => (this.orders = orders));
    this.orderService.getOrders();
  }

  openModalFormOrder() {
    this.isModalFormOrder = true;
  }

  closeModalFormOrder() {
    this.isModalFormOrder = false;
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe();
  }

  createOrder(order: Iorders): void {
    this.orderService.createOrder(order).subscribe();
  }

  editOrder(id: number, order: Iorder): void {
    this.orderService.updateOrder(id, order).subscribe();
  }
}
