import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICustomer } from '../../interfaces/customerResponse';

@Injectable({
  providedIn: 'root',
})
export class GetAllCustomersService {
  private http = inject(HttpClient);

  execute() {
    return this.http.get<ICustomer[]>('http://localhost:8080/customers');
  }
}
