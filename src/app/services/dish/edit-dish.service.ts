import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../interfaces/dish.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class EditDishService {
  private http = inject(HttpClient);

  getDish(id: number): Observable<IDish> {
    return this.http.get<IDish>(Env.API_URL + 'dish/' + id);
  }

  updateDish(id: number, dish: Partial<IDish>): Observable<IDish> {
    return this.http.put<IDish>(Env.API_URL + 'dish/' + id, dish);
  }
}