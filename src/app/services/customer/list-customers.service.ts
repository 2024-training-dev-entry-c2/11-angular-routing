import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { ICustomerResponse } from './interfaces/customer-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListCustomersService {
  private http = inject(HttpClient);

  execute(): Observable<ICustomerResponse[]> {
    return this.http.get<ICustomerResponse[]>(`${ENV.BASE_URL}/customers`);
  }
}
