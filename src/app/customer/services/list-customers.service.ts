import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ICustomerResponse } from '../interfaces/customer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListCustomersService {
  private http = inject(HttpClient);

  execute(): Observable<ICustomerResponse[]> {
    return this.http.get<ICustomerResponse[]>(environment.apiUrl + '/client');
  }
}
