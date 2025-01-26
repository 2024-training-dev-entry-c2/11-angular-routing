import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMenuRequest } from '../../interfaces/menuRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AddMenuService {
  private http = inject(HttpClient);

  execute(menu: Partial<IMenuRequest>): Observable<IMenuRequest> {
    return this.http
      .post<IMenuRequest>('http://localhost:8080/menu', menu, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
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
