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
    private orderToEditSubject = new BehaviorSubject<IOrders | null>(null);
    private orderToEdit$ = this.orderToEditSubject.asObservable();
    
    constructor(
      private http: HttpClient,
      private dataManagementService: DataManagementService<IOrders>

          
    ) {}
  
    getData() {
      return this.http.get<IOrders[]>(this.apiUrl).pipe(
        tap((data) => {
          this.dataManagementService.updateData(data);
        })
      );
    }
      
    postData(order: IOrders) {
      return this.http
       .post<IOrders>(this.apiUrl, order)
       .pipe(tap(newOrder => this.dataManagementService.addItem(newOrder))
      );
    }

     setOrderToDelete(dish: IOrders) {
        this.orderToDeleteSubject.next(dish);
      }
    
      getOrderToDelete() {
        return this.orderToDelete$;
      }


      setOrderToEdit(dish: IOrders) {
        this.orderToEditSubject.next(dish);
      }
    
      getOrderToEdit() {
        return this.orderToEdit$;
      }
      
    
      deleteData(orderId: number) {
        return this.http.delete<IOrders>(`${this.apiUrl}/${orderId}`).pipe(
          tap(() => {
            this.dataManagementService.removeItem(order => order.id === orderId);
          })
        );
      }

      editData(id: number, orderData: IOrders) {
          return this.http.put<IOrders>(`${this.apiUrl}/${id}`, orderData).pipe(
            tap((updatedClient) => {
              this.getData().subscribe();
              console.log(updatedClient);
            })
          );
        }
}
