import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenuResponse } from '../../interfaces/menu/menu.response.interface';
import { IMenuRequest } from '../../interfaces/menu/menu.request.interface';

@Injectable({
  providedIn: 'root'
})
export class PostMenuService {
  private http = inject(HttpClient);

  execute(menuRequest : IMenuRequest): Observable<IMenuResponse>{
    return this.http.post<IMenuResponse>('/menus',menuRequest);
  }
}
