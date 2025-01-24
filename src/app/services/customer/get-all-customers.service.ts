import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../../interfaces/customerResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllCustomersService {
  constructor(private http: HttpClient) {}

  execute(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>('http://localhost:8080/customers');
  }
}
