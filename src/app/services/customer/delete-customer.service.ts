import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FindAllCustomersService } from './find-all-customers.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteCustomerService {

  #findAllCustomerService = inject(FindAllCustomersService);
  http = inject(HttpClient);

  constructor() { }

  execute(id: number) {
    return this.http.delete(`${environment.api}/customer/${id}`)
    .pipe(
      tap(this.#findAllCustomerService.execute().subscribe())
    );
  }
}
