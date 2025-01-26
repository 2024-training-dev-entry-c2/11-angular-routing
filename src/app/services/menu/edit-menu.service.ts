import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMenu } from '../../interfaces/menuResponse.interface';
import { IMenuRequest } from '../../interfaces/menuRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class EditMenuService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/menu';

  getMenu(id: number): Observable<IMenu> {
    return this.http
      .get<IMenu>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateMenu(
    id: number,
    menu: Partial<IMenuRequest>
  ): Observable<IMenuRequest> {
    return this.http
      .put<IMenuRequest>(`${this.apiUrl}/${id}`, menu)
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
