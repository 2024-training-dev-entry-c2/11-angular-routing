import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '../../interfaces/dishResponse';

@Injectable({
  providedIn: 'root',
})
export class GetAllDishesService {
  private http = inject(HttpClient);
  execute() {
    return this.http.get<IDish[]>('http://localhost:8080/dishes');
  }
}
