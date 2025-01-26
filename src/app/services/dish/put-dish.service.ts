import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDishRequest } from '../../interfaces/dish/dish.request.interface';
import { IDishResponse } from '../../interfaces/dish/dish.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PutDishService {
  private http = inject(HttpClient);
  
  execute(id: string, dishRequest: IDishRequest): Observable<IDishResponse> {
    return this.http.put<IDishResponse>(`/platos/${id}`, dishRequest);
  }
}
