import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientResponse } from '../../interfaces/client/client.response.interface';

@Injectable({
  providedIn: 'root'
})
export class GetClientsService {
  private http = inject(HttpClient);
  
  execute(): Observable<IClientResponse[]>{
    return this.http.get<IClientResponse[]>('/clientes');
  }
}
