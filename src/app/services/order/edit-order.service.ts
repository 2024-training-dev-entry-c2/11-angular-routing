import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class EditOrderService {
  private http = inject(HttpClient);

  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(Env.API_URL + 'orders/' + id);
  }

  updateOrder(
    id: number,
    menu: Partial<IOrder>
  ): Observable<IOrder> {
    return this.http.put<IOrder>(Env.API_URL + 'orders/'+ id, menu);
  }
}