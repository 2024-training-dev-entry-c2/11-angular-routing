import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class EditMenuService {
  private http = inject(HttpClient);

  getMenu(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(Env.API_URL + 'menu/' + id);
  }

  updateMenu(
    id: number,
    menu: Partial<IMenu>
  ): Observable<IMenu> {
    return this.http.put<IMenu>(Env.API_URL + 'menu/' + id, menu);
  }
}