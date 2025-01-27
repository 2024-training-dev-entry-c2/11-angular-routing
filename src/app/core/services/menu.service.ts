import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Imenu, ImenuAlternativo } from '../../interfaces/menu/menu';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private menuSubject = new BehaviorSubject<Imenu[]>([]);
  public menuList = this.menuSubject.asObservable();

  getMenus(): void {
    this.http
      .get<Imenu[]>(`${environment.BASE_URL_MENU}`)
      .subscribe((menuList) => this.menuSubject.next(menuList));
  }

  getMenuById(id: number): Observable<Imenu> {
    return this.http.get<Imenu>(`${environment.BASE_URL_MENU}borrar/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createMenu(menu: ImenuAlternativo): Observable<Imenu> {
    return this.http
      .post<Imenu>(`${environment.BASE_URL_MENU}/add`, menu, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getMenus()));
  }

  updateMenu(id: number, menu: ImenuAlternativo): Observable<Imenu> {
    return this.http
      .put<Imenu>(`${environment.BASE_URL_MENU}/edit/${id}`, menu, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getMenus()));
  }

  deleteMenu(id: number): Observable<Imenu> {
    return this.http
      .delete<Imenu>(`${environment.BASE_URL_MENU}/borrar/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getMenus()));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
