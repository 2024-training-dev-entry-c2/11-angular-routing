import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import {
  ICreateCustomerRequest,
  ICustomerResponse,
} from './interfaces/customer-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private http = inject(HttpClient);

  execute(customer: ICreateCustomerRequest): Observable<ICustomerResponse> {
    return this.http.post<ICustomerResponse>(
      `${ENV.BASE_URL}/customers`,
      customer
    );
  }
}
