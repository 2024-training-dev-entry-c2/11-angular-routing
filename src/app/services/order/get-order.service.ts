import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderResponse } from '../../interfaces/order/order.response.interfaz';

@Injectable({
  providedIn: 'root'
})
export class GetOrderService {
  private http = inject(HttpClient);
    
  execute(id: string): Observable<IOrderResponse>{
    return this.http.get<IOrderResponse>(`/pedidos/${id}`);
  }
}
