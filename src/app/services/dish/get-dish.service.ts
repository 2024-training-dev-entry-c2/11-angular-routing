import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDishResponse } from '../../interfaces/dish/dish.response.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDishService {
  private http = inject(HttpClient);
  
  execute(id: string): Observable<IDishResponse>{
    return this.http.get<IDishResponse>(`/platos/${id}`);
  }
}
