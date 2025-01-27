import { Component, inject, OnInit } from '@angular/core';
import { ListOrdersService } from '../services/list-orders.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IOrderResponse, IOrder } from '../interfaces/order.interface';
import { UpdateOrderService } from '../services/update-order.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-order',
  imports: [FontAwesomeModule, DecimalPipe, DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  faPlus = faPlus;
  showSaveOrder = false;

  private listOrdersService = inject(ListOrdersService);
  private updateOrderService = inject(UpdateOrderService);

  orders: IOrderResponse[] = [];
  selectedOrder: IOrderResponse | null = null;
  selectedIdOrder!: number;

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this.listOrdersService.execute(formattedDate).subscribe((orders) => {
      this.orders = orders;
    });
  }

  showCreatOrderModal(): void {
    this.showSaveOrder = true;
  }
}
