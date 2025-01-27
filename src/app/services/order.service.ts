import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderResponseDto } from '../interfaces/order.interface';
import { IOrderItemResponseDto } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  // Crear una nueva orden
  addOrder(clientName: string, order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clientName}`, order);
  }

  // Obtener todos los pedidos
  getAllOrders(): Observable<IOrderResponseDto[]> {
    return this.http.get<IOrderResponseDto[]>(this.apiUrl);
  }

  // Obtener un pedido por ID
  getOrder(id: number): Observable<IOrderResponseDto> {
    return this.http.get<IOrderResponseDto>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un pedido
  updateOrder(id: number, order: IOrderResponseDto): Observable<IOrderResponseDto> {
    return this.http.put<IOrderResponseDto>(`${this.apiUrl}/${id}`, order);
  }

  // Eliminar un pedido
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Crear un item de orden dentro de una orden
  addOrderItem(idOrder: number, orderItem: IOrderItemResponseDto): Observable<IOrderItemResponseDto> {
    return this.http.post<IOrderItemResponseDto>(`${this.apiUrl}/${idOrder}/orderItems`, orderItem);
  }

  // Obtener un item de orden por ID
  getOrderItem(idOrder: number, idOrderItem: number): Observable<IOrderItemResponseDto> {
    return this.http.get<IOrderItemResponseDto>(`${this.apiUrl}/${idOrder}/orderItems/${idOrderItem}`);
  }

  // Actualizar un item de orden
  updateOrderItem(idOrder: number, idOrderItem: number, orderItem: IOrderItemResponseDto): Observable<IOrderItemResponseDto> {
    return this.http.put<IOrderItemResponseDto>(`${this.apiUrl}/${idOrder}/orderItems/${idOrderItem}`, orderItem);
  }

  // Eliminar un item de orden
  deleteOrderItem(idOrder: number, idOrderItem: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idOrder}/orderItems/${idOrderItem}`);
  }
}
