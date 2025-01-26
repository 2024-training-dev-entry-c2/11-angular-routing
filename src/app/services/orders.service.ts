import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, tap } from 'rxjs';
import { IOrders } from '../interface/orders.interface';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class getOrderService {
    private apiUrl = 'http://localhost:8080/api/orders';
    private orderToDeleteSubject = new BehaviorSubject<IOrders | null>(null);
    private orderToDelete$ = this.orderToDeleteSubject.asObservable();
    
    constructor(
      private http: HttpClient,
      private dataManagementService: DataManagementService<IOrders>

          
    ) {}
  
    getData() {
      return this.http.get<IOrders[]>(this.apiUrl).pipe(
        tap(data => this.dataManagementService.updateData(data))
      );
    }
      
    postData(client: IOrders) {
      return this.http.post<IOrders>(this.apiUrl, client).pipe(
        tap(newClient => this.dataManagementService.addItem(newClient))
      );
    }

     setDishToDelete(dish: IOrders) {
        this.orderToDeleteSubject.next(dish);
      }
    
      getDishToDelete() {
        return this.orderToDelete$;
      }
    
      deleteData(orderId: number) {
        return this.http.delete<IOrders>(`${this.apiUrl}/${orderId}`).pipe(
          tap(() => {
            this.dataManagementService.removeItem(order => order.id === orderId);
          })
        );
      }
}
