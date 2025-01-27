import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrders } from '@interfaces/order.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FindAllOrdersService {

  http = inject(HttpClient);

  constructor() { }

  execute(): Observable<IOrders[]> {
    return this.http.get<IOrders[]>(`${environment.api}/orders`);
  }

}
