import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReservationResponse } from '../../interfaces/reservationResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class EditReservationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/reservations';

  getReservation(id: number): Observable<IReservationResponse> {
    return this.http.get<IReservationResponse>(`${this.apiUrl}/${id}`);
  }

  updateReservation(
    id: number,
    dish: Partial<IReservationResponse>
  ): Observable<IReservationResponse> {
    return this.http.put<IReservationResponse>(`${this.apiUrl}/${id}`, dish);
  }
}
