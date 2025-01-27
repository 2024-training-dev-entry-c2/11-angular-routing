import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateCustomer } from '@interfaces/create-customer.interface';
import { ICustomer } from '@interfaces/customer.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FindAllCustomersService } from './find-all-customers.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {

  http = inject(HttpClient);
  findAllCustomerService = inject(FindAllCustomersService);

  constructor() { }

  execute(body: ICreateCustomer): Observable<ICustomer>{
    return this.http.post<ICustomer>(`${environment.api}/customer`, body)
    .pipe(
      tap(this.findAllCustomerService.execute().subscribe())
    );
  }
}
