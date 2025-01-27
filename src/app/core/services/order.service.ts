import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Iorder, Iorders } from '../../interfaces/order/order';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private ordersSubject = new BehaviorSubject<Iorder[]>([]);
  public orders = this.ordersSubject.asObservable();

  getOrders(): void {
    this.http
      .get<Iorder[]>(`${environment.BASE_URL_ORDERS}`)
      .subscribe((orders) => this.ordersSubject.next(orders));
  }
  getOrderById(id: number): Observable<Iorder> {
    return this.http
      .get<Iorder>(`${environment.BASE_URL_ORDERS}borrar/${id}`)
      .pipe(tap(() => this.getOrders()));
  }

  createOrder(order: Iorders): Observable<Iorders> {
    return this.http
      .post<Iorders>(`${environment.BASE_URL_ORDERS}/add`, order)
      .pipe(tap(() => this.getOrders()));
  }

  updateOrder(id: number, order: Iorder): Observable<Iorder> {
    return this.http
      .put<Iorder>(`${environment.BASE_URL_ORDERS}/edit/${id}`, order)
      .pipe(tap(() => this.getOrders()));
  }

  deleteOrder(id: number): Observable<Iorders> {
    return this.http
      .delete<Iorders>(`${environment.BASE_URL_ORDERS}/borrar/${id}`)
      .pipe(tap(() => this.getOrders()));
  }
}
