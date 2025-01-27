import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../interfaces/client.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);
  private urlBase = 'http://localhost:8080/api';
 
    post(cliente: IClient) {
      return this.http.post<IClient>(`${this.urlBase}/clientes`, cliente);
    }
  
    update(cliente: IClient) {
      return this.http.put<IClient>(`${this.urlBase}/clientes/${cliente.id}`, cliente, {
        headers: this.getHeaders(),
        responseType: 'text' as 'json',
      });
    }
  
    getAll(): Observable<IClient> {
      return this.http.get<IClient>(`${this.urlBase}/clientes`, {
        headers: this.getHeaders(),
      });
    }
  
    deleteById(id: number) {
      return this.http.delete(`${this.urlBase}/clientes/${id}`);
    }
  
    private getHeaders(): HttpHeaders {
      return new HttpHeaders().append('Content-Type', 'application/json');
    }
}
