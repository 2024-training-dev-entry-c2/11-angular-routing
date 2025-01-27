import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../interfaces/dish.interface';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private http = inject(HttpClient);
  private url = "http://localhost:8080/api/plato"; 


  getAll(): Observable<IDish[]> {
    return this.http.get<IDish[]>(this.url);
  }


  getById(id: number): Observable<IDish> {
    return this.http.get<IDish>(`${this.url}/${id}`);
  }


  save(dish: Partial<IDish>): Observable<string> {
    return this.http.post(
      this.url,
      dish,
      { responseType: 'text' }
    ) as Observable<string>;
  }


  update(id: number, dish: Partial<IDish>): Observable<IDish> {
    return this.http.put<IDish>(`${this.url}/${id}`, dish);
  }


  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.url}/${id}`,
      { responseType: 'text' }
    ) as Observable<string>;
  }


  processDishData(
    id: number,
    onDishLoaded: (dish: IDish) => void,
    onError?: (error: any) => void
  ): void {
    this.getById(id).subscribe({
      next: (dish) => {
        onDishLoaded(dish);
      },
      error: (err) => {
        console.error('Error al obtener el plato:', err);
        if (onError) onError(err);
      }
    });
  }
}