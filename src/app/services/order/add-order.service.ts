import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrderRequests } from '../../interfaces/orderRequest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddOrderService {
  private http = inject(HttpClient);

  execute(order: IOrderRequests): Observable<IOrderRequests> {
    if (order.dishIds) {
      order.dishIds = order.dishIds.map((dishId) =>
        parseInt(dishId.toString(), 10)
      );
    }

    if (order.reservationId) {
      order.reservationId = parseInt(order.reservationId.toString(), 10);
    }

    console.log(order);

    return this.http.post<IOrderRequests>(
      'http://localhost:8080/orders',
      order,
      {
        headers: this.getHeaders(),
      }
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
