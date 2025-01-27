import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IOrders } from '@interfaces/order.interface';
import { OrdersService } from '@services/orders/orders.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-view-orders',
  imports: [CommonModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrdersComponent implements OnInit {

  orders = new BehaviorSubject<IOrders[]>([]);
  orderService = inject(OrdersService);

  ngOnInit(): void {

    this.orderService.findAll().subscribe(data => this.orders.next(data));
  }
}
