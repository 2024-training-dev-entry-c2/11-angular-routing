import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IDishResponse, IDish } from '../interfaces/dish.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateDishService {
  private http = inject(HttpClient);

  execute(payload: IDish): Observable<IDishResponse> {
    return this.http.post<IDishResponse>(environment.apiUrl + '/dish', payload);
  }
}
