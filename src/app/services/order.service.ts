import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  public getOrders(): Observable<IOrder[]> {
    return this.http
      .get<{ success: boolean; data: IOrder[] }>(`${environment.BASE_URL}orders`)
      .pipe(map((response) => response.data));
  }

  public createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${environment.BASE_URL}orders`, order);
  }

  public updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${environment.BASE_URL}orders/${order.id}`, order);
  }

  public deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}orders/${orderId}`);
  }
}
