import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenuResponse } from '../../interfaces/menu/menu.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMenusService {
  private http = inject(HttpClient);

  execute(): Observable<IMenuResponse[]>{
    return this.http.get<IMenuResponse[]>('/menus');
  }
}
