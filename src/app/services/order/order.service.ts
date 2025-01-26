import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Order } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  getOrders(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8080/order').pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Failed to fetch orders'));
      })
    );

  }
  //?
  addOrder(order: Order): Observable<Order> {
    return this.http
      .post<Order>('http://localhost:8080/order', order)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching orders:', error);
          return throwError(() => new Error('Failed to fetch orders'));
        })
      );
  }
//?
  updateOrder(order: Order,id: number): Observable<Order> {
    return this.http
      .put<Order>(`http://localhost:8080/order/${id}`, order)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching orders:', error);
          return throwError(() => new Error('Failed to fetch orders'));
        })
      );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/order/delete/${id}`);
  }

  getOrderId(id: number): Observable<Order> {
    return this.http.get<any>(`http://localhost:8080/order/${id}`)
    .pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Failed to fetch orders'));
      })
    );
  }

  private validateResponse(response: any): any[] {
    if (Array.isArray(response)) {
      return response.map((order) => {
        if (
          typeof order.id === 'number' &&
          typeof order.client.id === 'number' &&
          typeof order.localDate === 'string' &&
          typeof order.dishfoodIds === 'object' &&
          typeof order.totalPrice === 'number' && 
          Array.isArray(order.dishfoodIds)
        ) {
          return order as Order;
        } else {
          throw new Error('Invalid order structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
  private validateObjectResponse(response: any): Order {
    if (
      typeof response.id === 'number' &&
      typeof response.client.id === 'number' &&
      typeof response.localDate === 'string' &&
      typeof response.dishfoodIds === 'object' &&
      typeof response.totalPrice === 'number' && 
      Array.isArray(response.dishfoodIds)
    ) {
      return response as Order;
    } else {
      throw new Error('Invalid order structure');
    }
  }
}
