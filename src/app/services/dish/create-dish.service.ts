import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { ICreateDishRequest, IDishResponse } from './interfaces/dish';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private http = inject(HttpClient);

  execute(dish: ICreateDishRequest):Observable<IDishResponse> {
    return this.http.post<IDishResponse>(`${ENV.BASE_URL}/dishes`, dish);
  }
}
