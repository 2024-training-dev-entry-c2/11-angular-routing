import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderResponse } from '../../interfaces/orderResponese.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllOrderService {
  constructor(private http: HttpClient) {}

  execute() {
    return this.http.get<IOrderResponse[]>('http://localhost:8080/orders');
  }
}
