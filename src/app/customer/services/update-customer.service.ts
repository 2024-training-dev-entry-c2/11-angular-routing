import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ICustomer, ICustomerResponse } from '../interfaces/customer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerService {
  private http = inject(HttpClient);

  execute(id: number, payload: ICustomer): Observable<ICustomerResponse> {
    return this.http.put<ICustomerResponse>(
      environment.apiUrl + '/client/' + id,
      payload
    );
  }
}
