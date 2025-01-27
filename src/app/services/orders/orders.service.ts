import { inject, Injectable } from '@angular/core';
import { FindAllOrdersService } from './find-all-orders.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrders } from '@interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  #findAllOrders = inject(FindAllOrdersService);

  ordersObserver = new BehaviorSubject<boolean>(false);

  constructor() { }

  findAll():Observable<IOrders[]> {
    return this.#findAllOrders.execute();
  }

}
