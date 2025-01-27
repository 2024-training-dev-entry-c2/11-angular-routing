import { Component, inject, OnInit } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe,CommonModule} from '@angular/common';

@Component({
  selector: 'app-order-get-all',
  imports: [RouterLink, CurrencyPipe,CommonModule],
  templateUrl: './order-get-all.component.html',
  styleUrl: './order-get-all.component.scss'
})
export class OrderGetAllComponent implements OnInit {
  orders: IOrder[] = [];

  private orderService = inject(OrderService);

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAll().subscribe({
      next: (lista) => {
        this.orders = lista;
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
      },
    });
  }
}
