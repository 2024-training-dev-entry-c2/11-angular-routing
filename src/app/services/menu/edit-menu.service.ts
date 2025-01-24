import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../interfaces/menuResponse.interface';
import { IMenuRequest } from '../../interfaces/menuRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class EditMenuService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/menu';

  getMenu(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.apiUrl}/${id}`);
  }

  updateMenu(
    id: number,
    menu: Partial<IMenuRequest>
  ): Observable<IMenuRequest> {
    return this.http.put<IMenuRequest>(`${this.apiUrl}/${id}`, menu);
  }
}
