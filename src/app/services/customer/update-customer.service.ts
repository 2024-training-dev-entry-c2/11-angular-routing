import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import {
  ICreateCustomerRequest,
  ICustomerResponse,
} from './interfaces/customer-interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerService {
  private http = inject(HttpClient);

  execute(
    customerId: number,
    customer: ICreateCustomerRequest
  ): Observable<ICustomerResponse> {
    return this.http
      .put<ICustomerResponse>(
        `${ENV.BASE_URL}/customers/${customerId}`,
        customer
      )
      .pipe(
        tap(() => {
          console.log;
        })
      );
  }
}
