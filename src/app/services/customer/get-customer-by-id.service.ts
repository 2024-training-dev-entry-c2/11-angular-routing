import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetCustomerByIdService {
  constructor(private http: HttpClient) {}

  execute(customerId: number) {
    return this.http.get(`http://localhost:8080/customers/${customerId}`);
  }
}
