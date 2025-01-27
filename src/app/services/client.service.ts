import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IClientResponse } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}
  
  addClient(client: any): Observable<any> {
    return this.http.post(this.baseUrl, client,  { responseType: 'text' as 'json' });
  }

  getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getClientById(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateClient(id: number, payload: IClient): Observable<IClientResponse> {
    return this.http.put<IClientResponse>(`${this.baseUrl}/${id}`, payload, { headers: this.getHeaders() });
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders{
    return new HttpHeaders()
      .append('Authorization', 'token')
      .append('Content-Type', 'application/json');
  }
}
