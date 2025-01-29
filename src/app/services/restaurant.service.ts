import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRestaurant } from '../inferfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 private http = inject(HttpClient);
  urlbase= 'http://localhost:8080/api/restaurante';

  execute(): Observable<IRestaurant> {
      return this.http.get<IRestaurant>(`${this.urlbase}/1`);
    }
}
