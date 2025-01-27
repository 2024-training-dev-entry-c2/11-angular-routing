import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../../interfaces/client.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class GetAllClientService {
  private http = inject(HttpClient);

  execute() {
    return this.http.get<IClient[]>(Env.API_URL + 'client');
  }

}
