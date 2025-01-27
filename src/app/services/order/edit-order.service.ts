import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order.interface';


@Injectable({
  providedIn: 'root',
})
export class EditOrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/orders';

  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/${id}`);
  }

  updateOrder(
    id: number,
    menu: Partial<IOrder>
  ): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.apiUrl}/${id}`, menu);
  }
}