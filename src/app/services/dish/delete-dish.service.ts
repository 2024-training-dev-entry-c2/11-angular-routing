import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishService {
  private apiUrl = 'http://localhost:8080/dishes';

  constructor(private http: HttpClient) {}

  deleteDish(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert(
      'The dish is registered in a menu or order. Please delete the menu or order first.'
    );
    return throwError(error);
  }
}
