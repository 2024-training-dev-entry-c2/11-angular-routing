import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/customerResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddCustomerService {
  private http = inject(HttpClient);

  execute(customer: Partial<ICustomer>): Observable<ICustomer> {
    return this.http.post<ICustomer>(
      'http://localhost:8080/customers',
      customer,
      { headers: this.getHeaders() }
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
