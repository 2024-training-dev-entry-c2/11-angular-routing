import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDish } from '../interfaces/dish.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private http = inject(HttpClient);

  public getDishes(): Observable<IDish[]> {
    return this.http
      .get<{ success: boolean; data: IDish[] }>(`${environment.BASE_URL}dishes`)
      .pipe(map(response => response.data));
  }

  public createDish(dish: IDish): Observable<IDish> {
    return this.http.post<IDish>(`${environment.BASE_URL}dishes`, dish);
  }

  public updateDish(dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${environment.BASE_URL}dishes/${dish.id}`, dish);
  }

  public deleteDish(dishId: number): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}dishes/${dishId}`);
  }
}
