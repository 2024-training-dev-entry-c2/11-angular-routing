import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../interfaces/dishResponse';

@Injectable({
  providedIn: 'root',
})
export class EditDishService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/dishes';

  getDish(id: number): Observable<IDish> {
    return this.http.get<IDish>(`${this.apiUrl}/${id}`);
  }

  updateDish(id: number, dish: Partial<IDish>): Observable<IDish> {
    return this.http.put<IDish>(`${this.apiUrl}/${id}`, dish);
  }
}
