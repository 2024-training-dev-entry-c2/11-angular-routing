import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClients, IClientsResponse } from '../interface/clients.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class getClientsService {
    private apiUrl = 'http://localhost:8080/api/clients';
  private http = inject(HttpClient);

  execute(payload: IClients): Observable<IClientsResponse> {
    return this.http.post<IClientsResponse>('http://localhost:8080/api/clients', payload, { headers: this.getHeaders() })
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
