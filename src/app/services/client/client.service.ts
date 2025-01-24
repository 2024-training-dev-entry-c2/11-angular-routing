import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Client, newClient } from '../../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  getClients(): Observable<Client[]> {
    return this.http.get<any>('http://localhost:8080/clients').pipe(
      map((response) => this.validateResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }
  addClient(client: newClient): Observable<Client> {
    return this.http
      .post<newClient>('http://localhost:8080/clients', client)
      .pipe(
        map((response) => this.validateObjectResponse(response)),
        catchError((error) => {
          console.error('Error fetching clients:', error);
          return throwError(() => new Error('Failed to fetch clients'));
        })
      );
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/clients/${id}`);
  }
  getClientId(id: number): Observable<Client> {
    return this.http.get<any>(`http://localhost:8080/clients/${id}`)
    .pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }

  updateClient(client: newClient, id: number): Observable<Client> {
    return this.http.put<any>(`http://localhost:8080/clients/${id}`, client)
    .pipe(
      map((response) => this.validateObjectResponse(response)),
      catchError((error) => {
        console.error('Error fetching clients:', error);
        return throwError(() => new Error('Failed to fetch clients'));
      })
    );
  }

  private validateResponse(response: any): Client[] {
    if (Array.isArray(response)) {
      return response.map((client) => {
        if (
          typeof client.id === 'number' &&
          typeof client.name === 'string' &&
          typeof client.email === 'string' &&
          typeof client.isOften === 'boolean' &&
          Array.isArray(client.orderIds)
        ) {
          return client as Client;
        } else {
          throw new Error('Invalid client structure');
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }

  private validateObjectResponse(response: any): Client {
    if (
      typeof response.id === 'number' &&
      typeof response.name === 'string' &&
      typeof response.email === 'string' &&
      typeof response.isOften === 'boolean' &&
      Array.isArray(response.orderIds)
    ) {
      return response as Client;
    } else {
      throw new Error('Invalid client structure');
    }
  }
}
