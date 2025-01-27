import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class GetOrderService {
  private http = inject(HttpClient);
 

  execute(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(Env.API_URL + 'orders/' + id);
  }

 

}