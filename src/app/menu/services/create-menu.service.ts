import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IMenu, IMenuResponse } from '../interfaces/menu.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuService {
  private http = inject(HttpClient);

  execute(payload: IMenu): Observable<IMenuResponse> {
    return this.http.post<IMenuResponse>(environment.apiUrl + '/menu', payload);
  }
}
