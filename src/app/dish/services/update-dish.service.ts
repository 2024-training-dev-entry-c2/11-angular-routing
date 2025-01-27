import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IDishResponse, IDish } from '../interfaces/dish.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateDishService {
  private http = inject(HttpClient);

  execute(id: number, payload: IDish): Observable<IDishResponse> {
    return this.http.put<IDishResponse>(
      environment.apiUrl + '/dish/' + id,
      payload
    );
  }
}
