import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../../interfaces/client.interface';
import { Env } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class AddClientService {
  private http = inject(HttpClient);

  execute(customer: Partial<IClient>): Observable<IClient> {
    return this.http.post<IClient>(Env.API_URL + 'client',customer);
  }

}