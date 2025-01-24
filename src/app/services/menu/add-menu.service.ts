import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenuRequest } from '../../interfaces/menuRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AddMenuService {
  private http = inject(HttpClient);

  execute(menu: Partial<IMenuRequest>): Observable<IMenuRequest> {
    if (menu.dishIds) {
      menu.dishIds = menu.dishIds.map((dishId) =>
        parseInt(dishId.toString(), 10)
      );
    }

    return this.http.post<IMenuRequest>('http://localhost:8080/menu', menu, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
