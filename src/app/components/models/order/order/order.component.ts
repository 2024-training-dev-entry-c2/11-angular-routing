import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IOrder } from '../../../../interfaces/order.interface';
import { GetAllOrderService } from '../../../../services/order/get-all-order.service';
import { Router, RouterLink } from '@angular/router';
import { OrderTableComponent } from '../order-table/order-table.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [CommonModule,OrderTableComponent, RouterLink ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent{
  orders = new BehaviorSubject<IOrder[]>([]);

}
