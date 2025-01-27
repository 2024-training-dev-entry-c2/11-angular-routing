import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../interfaces/order.interface';


@Injectable({
  providedIn: 'root',
})
export class GetAllOrderService {
  private apiUrl = 'http://localhost:8080/api/v1/orders';

  private http = inject(HttpClient);


  execute() {
    return this.http.get<IOrder[]>(this.apiUrl);
  }

}
