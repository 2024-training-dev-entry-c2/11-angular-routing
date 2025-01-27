import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { IDishResponse } from './interfaces/dish';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListDishesService {
  private http = inject(HttpClient);

  execute(): Observable<IDishResponse[]> {
    return this.http.get<IDishResponse[]>(`${ENV.BASE_URL}/dishes`);
  }
}
