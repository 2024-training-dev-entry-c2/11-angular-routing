import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IMenu } from '../interfaces/menu.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);

  public getMenus(): Observable<IMenu[]> {
    return this.http
      .get<{ success: boolean; data: IMenu[] }>(`${environment.BASE_URL}menus`)
      .pipe(map((response) => response.data));
  }

  public createMenu(menu: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(`${environment.BASE_URL}menus`, menu);
  }

  public updateMenu(menu: IMenu): Observable<IMenu> {
    return this.http.put<IMenu>(`${environment.BASE_URL}menus/${menu.id}`, menu);
  }

  public deleteMenu(menuId: number): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}menus/${menuId}`);
  }
}
