import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class AddOrderService {
  private http = inject(HttpClient);

  execute(order: Partial<IOrder>): Observable<IOrder> {
    return this.http.post<IOrder>(Env.API_URL + 'orders' ,order);
  }

}