import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientRequest } from '../../interfaces/client/client.request.interface';
import { IClientResponse } from '../../interfaces/client/client.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PutClientService {
  private http = inject(HttpClient);
    
  execute(id: string, clientRequest: IClientRequest): Observable<IClientResponse> {
    return this.http.put<IClientResponse>(`/clientes/${id}`, clientRequest);
  }
}
