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
export class UpdateCustomerService {

  http = inject(HttpClient);
  #findAllCustomerService = inject(FindAllCustomersService);

  constructor() { }

  execute(id: number, body: ICreateCustomer):Observable<ICustomer> {
    return this.http.put<ICustomer>(`${environment.api}/customer/${id}`, body)
    .pipe(
      tap(this.#findAllCustomerService.execute().subscribe())
    );
  }
}
