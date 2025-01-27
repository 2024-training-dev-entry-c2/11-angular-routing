import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenuResponse } from '../../interfaces/menu/menu.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private http = inject(HttpClient);
  
  execute(id: string): Observable<IMenuResponse>{
    return this.http.get<IMenuResponse>(`/menus/${id}`);
  }
}
