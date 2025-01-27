import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  IOrderRequestDTO,
  IOrderResponse,
} from '../interfaces/order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateOrderService {
  private http = inject(HttpClient);

  execute(id: number, payload: IOrderRequestDTO): Observable<IOrderResponse> {
    return this.http.put<IOrderResponse>(
      environment.apiUrl + '/order/' + id,
      payload
    );
  }
}
