import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class AddDishService {
  private http = inject(HttpClient);

  execute(dish: Partial<IDish>): Observable<IDish> {
    return this.http.post<IDish>('http://localhost:8080/api/v1/dish',dish);
  }

}