import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReservationResponse } from '../../interfaces/reservationResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class EditOrderService {
  private apiUrl = 'http://localhost:8080/orders';
  private http = inject(HttpClient);

  getOrder(id: number) {
    return this.http.get<IReservationResponse>(`${this.apiUrl}/${id}`);
  }

  updateOrder(id: number, order: Partial<IReservationResponse>) {
    return this.http.put<IReservationResponse>(`${this.apiUrl}/${id}`, order);
  }
}
