import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../interfaces/dishResponse';

@Injectable({
  providedIn: 'root',
})
export class AddDishService {
  private http = inject(HttpClient);

  execute(dish: Partial<IDish>): Observable<IDish> {
    return this.http.post<IDish>('http://localhost:8080/dishes', dish, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
