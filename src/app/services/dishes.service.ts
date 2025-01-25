import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDishes, IDishesResponse } from '../interface/dishes.interface';


@Injectable({
  providedIn: 'root'
})
export class getDishService {
    private apiUrl = 'http://localhost:8080/api/dishes';
  private http = inject(HttpClient);

  // execute(payload: IDishes): Observable<IDishes> {
  //   // return this.http.post<IDishesResponse>('http://localhost:8080/api/dishes', payload, { headers: this.getHeaders() })
  //   // return  this.http.post
  // }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
    .append('Authorization', 'token')
    .append('Content-Type', 'application/json');
  }
  
  
  getMenu(): Observable<Object> {
      return this.http.get<any>(this.apiUrl);
    }
}
