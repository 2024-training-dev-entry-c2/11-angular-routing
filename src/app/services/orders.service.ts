import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  tap } from 'rxjs';
import { IOrders } from '../interface/orders.interface';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class getOrderService {
    private apiUrl = 'http://localhost:8080/api/orders';
    
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
}
