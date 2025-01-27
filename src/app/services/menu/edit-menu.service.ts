import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interface';


@Injectable({
  providedIn: 'root',
})
export class EditMenuService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/menu';

  getMenu(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.apiUrl}/${id}`);
  }

  updateMenu(
    id: number,
    menu: Partial<IMenu>
  ): Observable<IMenu> {
    return this.http.put<IMenu>(`${this.apiUrl}/${id}`, menu);
  }
}