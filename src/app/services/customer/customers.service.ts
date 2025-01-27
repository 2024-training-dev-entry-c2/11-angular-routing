import { inject, Injectable, signal } from '@angular/core';
import { FindAllCustomersService } from './find-all-customers.service';
import { ICustomer } from '@interfaces/customer.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateCustomerService } from './create-customer.service';
import { ICreateCustomer } from '@interfaces/create-customer.interface';
import { DeleteCustomerService } from './delete-customer.service';
import { UpdateCustomerService } from './update-customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  #findAllCustomerService = inject(FindAllCustomersService);
  #createCustomer = inject(CreateCustomerService);
  #deleteCustomer = inject(DeleteCustomerService);
  #updateCustomer = inject(UpdateCustomerService);

  customerObserver = new BehaviorSubject<boolean>(false);


  constructor() { }

  findAll(): Observable<ICustomer[]> {
    return this.#findAllCustomerService.execute();
  }

  create(body: ICreateCustomer): Observable<ICustomer> {
    return this.#createCustomer.execute(body);

  }

  remove(id: number) {
    return this.#deleteCustomer.execute(id).subscribe({
      next: () => {
        this.customerObserver.next(true);
      }
    });
  }

  update(id: number, body: ICreateCustomer): Observable<ICustomer> {
    return this.#updateCustomer.execute(id, body);
  }


}
