import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../interfaces/order.interface'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/pedido'; 


  getAll(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.url);
  }

  getById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.url}/${id}`);
  }

  save(order: Partial<IOrder>): Observable<string> {
    return this.http.post(
      this.url,
      order,
      { responseType: 'text' }
    ) as Observable<string>;
  }

  update(id: number, order: Partial<IOrder>): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.url}/${id}`, order);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.url}/${id}`,
      { responseType: 'text' }
    ) as Observable<string>;
  }

  processOrderData(
    id: number,
    onOrderLoaded: (order: IOrder) => void,
    onError?: (error: any) => void
  ): void {
    this.getById(id).subscribe({
      next: (order) => {
        onOrderLoaded(order);
      },
      error: (err) => {
        console.error('Error al obtener la orden:', err);
        if (onError) onError(err);
      },
    });
  }
}
