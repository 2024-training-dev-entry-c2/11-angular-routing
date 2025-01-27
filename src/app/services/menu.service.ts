import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu, IMenuResponse } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) {}
  
  addMenu(menu: any): Observable<any> {
    return this.http.post(this.baseUrl, menu);
  }

  getMenus(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getMenuById(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateMenu(id: number, payload: IMenu): Observable<IMenuResponse> {
    return this.http.put<IMenuResponse>(`${this.baseUrl}/${id}`, payload, { headers: this.getHeaders() });
  }

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
