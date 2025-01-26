import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IMenu, IMenuResponse } from '../interfaces/menu.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuService {
  private http = inject(HttpClient);

  execute(id: number, payload: IMenu): Observable<IMenuResponse> {
    return this.http.put<IMenuResponse>(
      environment.apiUrl + '/menu/' + id,
      payload
    );
  }
}
