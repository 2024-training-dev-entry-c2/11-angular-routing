import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderRequest } from '../../interfaces/order/order.request.interface';
import { IOrderResponse } from '../../interfaces/order/order.response.interfaz';

@Injectable({
  providedIn: 'root'
})
export class PutOrderService {
  private http = inject(HttpClient);
  
  execute(id: string, orderRequest: IOrderRequest): Observable<IOrderResponse> {
    return this.http.put<IOrderResponse>(`/pedidos/${id}`, orderRequest);
  }
}
