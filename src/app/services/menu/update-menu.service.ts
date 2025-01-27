import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { ICreateMenuRequest, IMenuResponse } from './interfaces/menu-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuService {
  private http = inject(HttpClient);

  execute(menuId: number, menu: ICreateMenuRequest): Observable<IMenuResponse> {
    return this.http.put<IMenuResponse>(
      `${ENV.BASE_URL}/menus/${menuId}`,
      menu
    );
  }
}
