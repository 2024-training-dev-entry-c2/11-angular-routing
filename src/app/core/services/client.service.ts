import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  getClients(): Observable<any> {
    return this.http.get<any[]>(`http://localhost:8080/api/users/all`);
  }

  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL_USERS}${id}`, {
      headers: this.getHeaders(),
    });
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL_USERS}`, client, {
      headers: this.getHeaders(),
    });
  }

  updateClient(client: any): Observable<any> {
    return this.http.put<any>(`${environment.BASE_URL_USERS}`, client, {
      headers: this.getHeaders(),
    });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL_USERS}${id}`, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
