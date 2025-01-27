import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order.interface';


@Injectable({
  providedIn: 'root',
})
export class AddOrderService {
  private http = inject(HttpClient);

  execute(customer: Partial<IOrder>): Observable<IOrder> {
    return this.http.post<IOrder>('http://localhost:8080/api/v1/orders',customer);
  }

}