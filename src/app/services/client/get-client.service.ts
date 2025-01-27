import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientResponse } from '../../interfaces/client/client.response.interface';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {
  private http = inject(HttpClient);
  
  execute(id: string): Observable<IClientResponse>{
    return this.http.get<IClientResponse>(`/clientes/${id}`);
  }
}
