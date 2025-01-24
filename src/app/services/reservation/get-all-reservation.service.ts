import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReservationResponse } from '../../interfaces/reservationResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllReservationService {
  constructor(private http: HttpClient) {}

  execute() {
    return this.http.get<IReservationResponse[]>(
      'http://localhost:8080/reservations'
    );
  }
}
