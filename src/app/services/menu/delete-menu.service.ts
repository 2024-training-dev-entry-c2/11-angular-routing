import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuService {
  private http = inject(HttpClient);

  execute(menuId: number):Observable<void> {
    return this.http.delete<void>(`${ENV.BASE_URL}/menus/${menuId}`);
  }
}
