import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../interfaces/order.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class GetAllOrderService {
  private http = inject(HttpClient);


  execute() {
    return this.http.get<IOrder[]>(Env.API_URL + 'orders');
  }

}
