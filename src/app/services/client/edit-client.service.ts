import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../../interfaces/client.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class EditClientService {
  private http = inject(HttpClient);

  getClient(id: number): Observable<IClient> {
    return this.http.get<IClient>(Env.API_URL + 'client/' + id);
  }

  updateClient(
    id: number,
    client: Partial<IClient>
  ): Observable<IClient> {
    return this.http.put<IClient>(Env.API_URL + 'client/' + id, client);
  }
}