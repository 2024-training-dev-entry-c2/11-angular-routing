import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Idish } from '../../interfaces/dish/dish';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private dishesSubject = new BehaviorSubject<Idish[]>([]);
  public dishes = this.dishesSubject.asObservable();

  private http = inject(HttpClient);

  getDishes(): void {
    this.http
      .get<Idish[]>(`${environment.BASE_URL_DISHES}`, {
        headers: this.getHeaders(),
      })
      .subscribe((dishes) => this.dishesSubject.next(dishes));
  }

  getDishById(id: number): Observable<Idish> {
    return this.http.get<Idish>(`${environment.BASE_URL_DISHES}borrar/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createDish(dish: Idish): Observable<Idish> {
    return this.http
      .post<Idish>(`${environment.BASE_URL_DISHES}/add`, dish)
      .pipe(tap(() => this.getDishes()));
  }

  updateDish(id: number, dish: Idish): Observable<Idish> {
    return this.http
      .put<Idish>(`${environment.BASE_URL_DISHES}/actualizar/${id}`, dish, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getDishes()));
  }

  deleteDish(id: number): Observable<Idish> {
    return this.http
      .delete<Idish>(`${environment.BASE_URL_DISHES}/borrar/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getDishes()));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
