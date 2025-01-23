import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Client } from '../../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {

  private http = inject(HttpClient);
  getClients(): Observable<Client[]> {
    return this.http
    .get<any>('http://localhost:8080/clients')
    .pipe(
      map((response) => this.validateResponse(response)),
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
}
