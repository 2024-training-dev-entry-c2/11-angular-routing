import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Menu } from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private http = inject(HttpClient);
  getMenus(): Observable<Menu[]> {
    return this.http.get<any>('http://localhost:8080/menus').pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching menus:', error);
        return throwError(() => new Error('Failed to fetch menus'));
      })
    );
  } 

  private validateResponse(response: any): any[] {
    if (Array.isArray(response)) {
      return response.map((menu) => {
        if (
          typeof menu.id === 'number' &&
          typeof menu.name === 'string' &&
          typeof menu.dishfoods === 'object'
        ) {
          return menu as Menu;
        } else {
          throw new Error('Invalid menu structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
}
