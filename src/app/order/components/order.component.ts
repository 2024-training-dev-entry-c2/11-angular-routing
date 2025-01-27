import { Component, inject, OnInit } from '@angular/core';
import { ListOrdersService } from '../services/list-orders.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IOrderResponse, IOrder } from '../interfaces/order.interface';
import { UpdateOrderService } from '../services/update-order.service';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CartComponent } from '../../cart/cart.component';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-order',
  imports: [
    FontAwesomeModule,
    DecimalPipe,
    DatePipe,
    OrderDetailComponent,
    CartComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  faPlus = faPlus;

  showOrderDetails = false;
  showCart = false;

  private listOrdersService = inject(ListOrdersService);
  private updateOrderService = inject(UpdateOrderService);

  orders: IOrderResponse[] = [];
  selectedOrder: IOrderResponse | null = null;

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this.listOrdersService.execute(formattedDate).subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrderDetailsModal(order: IOrderResponse): void {
    this.selectedOrder = order;
    this.showOrderDetails = true;
  }

  closeOrderDetailsModal(): void {
    this.showOrderDetails = false;
    this.selectedOrder = null;
  }

  showCartModal(): void {
    this.showCart = true;
  }

  closeCartModal(): void {
    this.showCart = false;
  }

  changeStatus(order: IOrderResponse, status: string): void {
    this.updateOrderService
      .execute(order.id, {
        clientId: order.client.id,
        status: status,
      })
      .subscribe((updatedOrder) => {
        this.orders = this.orders.map((o) =>
          o.id === updatedOrder.id ? updatedOrder : o
        );
      });
  }

  addOrder(newOrder: IOrderResponse): void {
    this.orders = [...this.orders, newOrder];
  }
}
