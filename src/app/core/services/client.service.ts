import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Iclient } from '../../interfaces/client/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientesSubject = new BehaviorSubject<Iclient[]>([]);
  public clientes = this.clientesSubject.asObservable();

  private http = inject(HttpClient);

  getClients(): void {
    this.http
      .get<Iclient[]>(`${environment.BASE_URL_USERS}all`, {
        headers: this.getHeaders(),
      })
      .subscribe((users) => this.clientesSubject.next(users));
  }

  getClientById(id: number): Observable<Iclient> {
    return this.http.get<Iclient>(`${environment.BASE_URL_USERS}borrar/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createClient(client: Iclient): Observable<Iclient> {
    return this.http
      .post<Iclient>(`${environment.BASE_URL_USERS}save`, client)
      .pipe(tap(() => this.getClients()));
  }

  updateClient(id: number, client: Iclient): Observable<Iclient> {
    return this.http
      .put<Iclient>(`${environment.BASE_URL_USERS}editar/${id}`, client, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getClients()));
  }

  deleteClient(id: number): Observable<Iclient> {
    return this.http
      .delete<Iclient>(`${environment.BASE_URL_USERS}borrar/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(tap(() => this.getClients()));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
