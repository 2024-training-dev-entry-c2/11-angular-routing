import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderResponse } from '../../interfaces/order/order.response.interfaz';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersService {
  private http = inject(HttpClient);
  
  execute(): Observable<IOrderResponse[]>{
    return this.http.get<IOrderResponse[]>('/pedidos');
  }
}
