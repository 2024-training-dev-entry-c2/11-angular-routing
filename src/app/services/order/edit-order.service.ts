import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IReservationResponse } from '../../interfaces/reservationResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class EditOrderService {
  private apiUrl = 'http://localhost:8080/orders';
  private http = inject(HttpClient);

  getOrder(id: number): Observable<IReservationResponse> {
    return this.http
      .get<IReservationResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateOrder(
    id: number,
    order: Partial<IReservationResponse>
  ): Observable<IReservationResponse> {
    return this.http
      .put<IReservationResponse>(`${this.apiUrl}/${id}`, order)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
