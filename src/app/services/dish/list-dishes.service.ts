import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { IDishResponse } from './interfaces/dish';

@Injectable({
  providedIn: 'root',
})
export class ListDishesService {
  private http = inject(HttpClient);

  execute() {
    return this.http.get<IDishResponse[]>(`${ENV.BASE_URL}/dishes`);
  }
}
