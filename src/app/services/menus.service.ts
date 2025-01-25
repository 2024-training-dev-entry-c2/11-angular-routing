import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu, IMenuResponse } from '../interface/menus.interface';

@Injectable({
  providedIn: 'root'
})
export class getMenusService {
    private apiUrl = 'http://localhost:8080/api/menus';
  private http = inject(HttpClient);

  execute(payload: IMenu): Observable<IMenuResponse> {
    return this.http.post<IMenuResponse>('http://localhost:8080/api/menus', payload, { headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
    .append('Authorization', 'token')
    .append('Content-Type', 'application/json');
  }
  
  
  getData(): Observable<Object> {
      return this.http.get<any>(this.apiUrl);
    }
}
