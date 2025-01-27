import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { IClient } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);

  public getClients(): Observable<IClient[]> {
    return this.http
      .get<{ success: boolean; data: IClient[] }>(`${environment.BASE_URL}clients`)
      .pipe(map(response => response.data));
  }

  public createClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(`${environment.BASE_URL}clients`, client);
  }

  public updateClient(client: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${environment.BASE_URL}clients/${client.id}`, client);
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}clients/${clientId}`);
  }
}
