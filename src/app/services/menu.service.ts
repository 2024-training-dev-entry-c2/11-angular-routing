import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IMenu } from '../interfaces/menu/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private urlBase = 'http://localhost:8080/api';

  post(menu: IMenu) {
    return this.http.post<IMenu>(`${this.urlBase}/menus`, menu);
  }

  update(menu: IMenu) {
    return this.http.put<IMenu>(`${this.urlBase}/menus/${menu.id}`, menu, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }

  getAll(): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.urlBase}/menus`, {
      headers: this.getHeaders(),
    });
  }

  deleteById(id: number) {
    return this.http.delete(`${this.urlBase}/menus/${id}`);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
