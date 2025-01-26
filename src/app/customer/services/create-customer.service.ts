import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ICustomer, ICustomerResponse } from '../interfaces/customer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private http = inject(HttpClient);

  execute(payload: ICustomer): Observable<ICustomerResponse> {
    return this.http.post<ICustomerResponse>(
      environment.apiUrl + '/client',
      payload
    );
  }
}
