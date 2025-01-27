import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderResponseDto } from '../interfaces/order.interface';
import { IOrderItemResponseDto } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  addOrder(clientName: string, order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clientName}`, order);
  }

  getAllOrders(): Observable<IOrderResponseDto[]> {
    return this.http.get<IOrderResponseDto[]>(this.apiUrl);
  }

  getOrder(id: number): Observable<IOrderResponseDto> {
    return this.http.get<IOrderResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateOrder(id: number, order: IOrderResponseDto): Observable<IOrderResponseDto> {
    return this.http.put<IOrderResponseDto>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addOrderItem(idOrder: number, orderItem: IOrderItemResponseDto): Observable<IOrderItemResponseDto> {
    return this.http.post<IOrderItemResponseDto>(`${this.apiUrl}/${idOrder}/orderItems`, orderItem);
  }

  getOrderItem(idOrder: number, idOrderItem: number): Observable<IOrderItemResponseDto> {
    return this.http.get<IOrderItemResponseDto>(`${this.apiUrl}/${idOrder}/orderItems/${idOrderItem}`);
  }

  updateOrderItem(idOrder: number, idOrderItem: number, orderItem: IOrderItemResponseDto): Observable<IOrderItemResponseDto> {
    return this.http.put<IOrderItemResponseDto>(`${this.apiUrl}/${idOrder}/orderItems/${idOrderItem}`, orderItem);
  }

  deleteOrderItem(idOrder: number, idOrderItem: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idOrder}/orderItems/${idOrderItem}`);
  }
}
