import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order.interface';


@Injectable({
  providedIn: 'root',
})
export class GetOrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/orders';

  execute(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/${id}`);
  }

 

}