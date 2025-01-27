import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMenu } from '../interfaces/menu.interface'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/menu';


  getAll(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.url);
  }


  getById(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.url}/${id}`);
  }


  save(menu: Partial<IMenu>): Observable<string> {
    return this.http.post(
      this.url,
      menu,
      { responseType: 'text' }
    ) as Observable<string>;
  }


  update(id: number, menu: Partial<IMenu>): Observable<IMenu> {
    return this.http.put<IMenu>(`${this.url}/${id}`, menu);
  }


  delete(id: number): Observable<string> {
    return this.http.delete(
      `${this.url}/${id}`,
      { responseType: 'text' }
    ) as Observable<string>;
  }


  processMenuData(
    id: number,
    onMenuLoaded: (menu: IMenu) => void,
    onError?: (error: any) => void
  ): void {
    this.getById(id).subscribe({
      next: (menu) => {
        onMenuLoaded(menu);
      },
      error: (err) => {
        console.error('Error al obtener menú:', err);
        if (onError) onError(err);
      },
    });
  }
}
