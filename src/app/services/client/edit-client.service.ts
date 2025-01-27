import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../../interfaces/client.interface';


@Injectable({
  providedIn: 'root',
})
export class EditClientService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/client';

  getClient(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.apiUrl}/${id}`);
  }

  updateClient(
    id: number,
    client: Partial<IClient>
  ): Observable<IClient> {
    return this.http.put<IClient>(`${this.apiUrl}/${id}`, client);
  }
}