import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);
    private url = 'http://localhost:8080/api/pedido';


    //   getAll(): Observable<IOrder[]> {
    //     return this.http.get<IOrder[]>(this.url);
    //   }

    getAll(): Observable<IOrder[]> {
        return this.http.get<IOrder[]>(this.url).pipe(
            map(orders => orders.map(order => ({
                ...order,
                fechaPedido: this.convertArrayToDate(order.fechaPedido)
            })))
        );
    }

    // getById(id: number): Observable<IOrder> {
    //     return this.http.get<IOrder>(`${this.url}/${id}`);
    // }

    getById(id: number): Observable<IOrder> {
        return this.http.get<IOrder>(`${this.url}/${id}`).pipe(
          map(order => ({
            ...order,
            fechaPedido: this.convertArrayToDate(order.fechaPedido)
          }))
        );
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

    private convertArrayToDate(fecha: Date | number[] | undefined): Date {
       
        if (fecha instanceof Date) {
            return fecha;
        }
    
        
        if (!fecha || !Array.isArray(fecha) || fecha.length < 7) {
            return new Date();
        }
    
      
        const [year, month, day, hour, minute, second, nanosecond] = fecha;
        const millisecond = Math.floor(nanosecond / 1_000_000); 
        return new Date(year, month - 1, day, hour, minute, second, millisecond);
    }


}
