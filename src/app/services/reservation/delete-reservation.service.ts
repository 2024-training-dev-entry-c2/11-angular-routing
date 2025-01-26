import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteReservationService {
  private apiUrl = 'http://localhost:8080/reservations';

  constructor(private http: HttpClient) {}

  deleteReservation(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The reservation is registered in an order. Please delete the order first.'
    );
    return throwError(error);
  }
}
