import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICustomer } from '@interfaces/customer.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FindAllCustomersService {

  http = inject(HttpClient);

  url: string = `${environment.api}/customer`
  constructor() { }

  execute():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this.url)
    .pipe(
      tap(console.log)
    );
  }

}


