import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { IMenuResponse } from './interfaces/menu-interface';

@Injectable({
  providedIn: 'root',
})
export class ListMenusService {
  private http = inject(HttpClient);

  execute(menuId: number) {
    return this.http.delete<IMenuResponse[]>(`${ENV.BASE_URL}/menus/${menuId}`);
  }
}
