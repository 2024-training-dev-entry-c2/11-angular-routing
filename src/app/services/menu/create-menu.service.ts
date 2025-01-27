import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { ICreateMenuRequest, IMenuResponse } from './interfaces/menu-interface';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuService {
  private http = inject(HttpClient);

  execute(menu: ICreateMenuRequest) {
    return this.http.post<IMenuResponse>(`${ENV.BASE_URL}/menus`, menu);
  }
}
