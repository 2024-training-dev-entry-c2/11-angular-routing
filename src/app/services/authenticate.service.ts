import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth, IAuthenticationResponse } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private http = inject(HttpClient);

  execute(payload: IAuth): Observable<IAuthenticationResponse> {
    return this.http.post<IAuthenticationResponse>('http::/localgost:2020/api/v1', payload, { headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
    .append('Authorization', 'token')
    .append('Content-Type', 'application/json');
  }
}
