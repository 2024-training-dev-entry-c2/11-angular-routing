import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../../interfaces/client.interface';


@Injectable({
  providedIn: 'root',
})
export class GetAllClientService {
  private apiUrl = 'http://localhost:8080/api/v1/client';

  private http = inject(HttpClient);


  execute() {
    return this.http.get<IClient[]>(this.apiUrl);
  }

}
