import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClients, IClientsResponse } from '../interface/clients.interface';
import { Observable } from 'rxjs';
import { IOrders, IOrdersResponse } from '../interface/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class getOrderService {
    private apiUrl = 'http://localhost:8080/api/orders';
  private http = inject(HttpClient);

  execute(payload: IOrders): Observable<IOrdersResponse> {
    return this.http.post<IOrdersResponse>('http://localhost:8080/api/orders', payload, { headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
    .append('Authorization', 'token')
    .append('Content-Type', 'application/json');
  }
  
  
  getOrders(): Observable<Object> {
      return this.http.get<any>(this.apiUrl);
    }
}
