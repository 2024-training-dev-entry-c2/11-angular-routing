import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) {}

  deleteCustomer(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The customer is registered in an order. Please delete the order first'
    );
    return throwError(error);
  }
}
