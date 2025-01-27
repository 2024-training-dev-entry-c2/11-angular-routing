import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DishService } from '../../services/dish.service';
import { IOrder } from '../../interfaces/order.interface';
import { IDish } from '../../interfaces/dish.interface';
import { OrderModalComponent } from "../order-modal/order-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [OrderModalComponent, CommonModule],
})
export class OrderComponent implements OnInit {
  orders: IOrder[] = [];
  dishes: IDish[] = [];
  selectedOrder: IOrder | null = null;
  isModalOpen: boolean = false;

  constructor(private orderService: OrderService, private dishService: DishService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadDishes();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  getDishNames(dishIds: number[]): string[] {
    return this.dishes
      .filter((dish) => dishIds.includes(dish.id))
      .map((dish) => dish.name);
  }

  openModal(order: IOrder | null): void {
    this.selectedOrder = order;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedOrder = null;
  }

  saveOrder(order: IOrder): void {
    if (order.id === 0) {
      this.orderService.createOrder(order).subscribe((newOrder) => {
        this.orders.push(newOrder);
        this.closeModal();
      });
    } else {
      this.orderService.updateOrder(order).subscribe((updatedOrder) => {
        const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        this.closeModal();
      });
    }
  }

  deleteOrder(orderId: number): void {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      this.orderService.deleteOrder(orderId).subscribe(() => {
        this.orders = this.orders.filter((o) => o.id !== orderId);
      });
    }
  }
}
