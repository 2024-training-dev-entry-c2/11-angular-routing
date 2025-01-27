import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenuRequest } from '../../interfaces/menu/menu.request.interface';
import { Observable } from 'rxjs';
import { IMenuResponse } from '../../interfaces/menu/menu.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PutMenuService {
  private http = inject(HttpClient);

  execute(id: string, menuRequest: IMenuRequest): Observable<IMenuResponse> {
    return this.http.put<IMenuResponse>(`/menus/${id}`, menuRequest);
  }
}
