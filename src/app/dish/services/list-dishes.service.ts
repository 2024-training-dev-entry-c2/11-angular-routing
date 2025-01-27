import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IDishResponse } from '../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class ListDishesService {
  private http = inject(HttpClient);

  execute(menuId: number): Observable<IDishResponse[]> {
    return this.http.get<IDishResponse[]>(
      environment.apiUrl + '/dish/menu/' + menuId
    );
  }
}
