import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IOrder, IOrderResponse } from '../interfaces/order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderService {
  private http = inject(HttpClient);

  execute(payload: IOrder): Observable<IOrderResponse> {
    return this.http.post<IOrderResponse>(
      environment.apiUrl + '/order',
      payload
    );
  }
}
