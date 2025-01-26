import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientRequest } from '../../interfaces/client/client.request.interface';
import { IClientResponse } from '../../interfaces/client/client.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PostClientService {
  private http = inject(HttpClient);

  execute(clientRequest : IClientRequest): Observable<IClientResponse>{
    return this.http.post<IClientResponse>('/clientes',clientRequest);
  }
}
