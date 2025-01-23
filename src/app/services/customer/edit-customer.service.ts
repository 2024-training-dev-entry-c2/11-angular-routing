import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../interfaces/customerResponse';

@Injectable({
  providedIn: 'root',
})
export class EditCustomerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/customers';

  getCustomer(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.apiUrl}/${id}`);
  }

  updateCustomer(
    id: number,
    customer: Partial<ICustomer>
  ): Observable<ICustomer> {
    return this.http.put<ICustomer>(`${this.apiUrl}/${id}`, customer);
  }
}
