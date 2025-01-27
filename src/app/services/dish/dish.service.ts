import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dishfood, DishfoodRequest } from '../../interfaces/menu.interface';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private http = inject(HttpClient);
  addDish(dish: Dishfood): Observable<DishfoodRequest> {
    return this.http
      .post<DishfoodRequest>('http://localhost:8080/dishfoods', dish)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching dishfood:', error);
          return throwError(() => new Error('Failed to fetch dishfood'));
        })
      );
  }
  deleteDish(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/dishfoods/${id}`);
  }
  getDishId(id: number): Observable<DishfoodRequest> {
    return this.http.get<any>(`http://localhost:8080/dishfoods/${id}`).pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching dishfood:', error);
        return throwError(() => new Error('Failed to fetch dishfood'));
      })
    );
  }
  updateDish(dish: Dishfood, id: number): Observable<DishfoodRequest> {
    return this.http
      .put<DishfoodRequest>( `http://localhost:8080/dishfoods/${id}`, dish)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching dishfood:', error);
          return throwError(() => new Error('Failed to fetch dishfood'));
        })
      );
  }

  private validateResponse(response: any): any[] {
    if (Array.isArray(response)) {
      return response.map((dish) => {
        if (
          typeof dish.id === 'number' &&
          typeof dish.name === 'string' &&
          typeof dish.price === 'number' &&
          typeof dish.isPopular === 'boolean' &&
          typeof dish.menu === 'string' &&
          typeof dish.orderList === 'object'
        ) {
          return dish as Dishfood;
        } else {
          throw new Error('Invalid dishfood structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
  protected validateObjectResponse(response: any): DishfoodRequest {
    if (
      typeof response.id === 'number' &&
      typeof response.name === 'string' &&
      typeof response.price === 'number' &&
      typeof response.isPopular === 'boolean' &&
      typeof response.menu === 'string' &&
      typeof response.orderList === 'object'
    ) {
      return response as DishfoodRequest;
    } else {
      throw new Error('Invalid dishfood structure');
    }
  }
}
