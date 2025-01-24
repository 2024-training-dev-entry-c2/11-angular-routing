import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../interfaces/dishResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class GetDishByIdService {
  private http = inject(HttpClient);

  execute(dishId: number): Observable<IDish> {
    return this.http.get<IDish>(`http://localhost:8080/dishes/${dishId}`);
  }
}
