import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth, IAuthenticationResponse } from '../interfaces/auth.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) { }

  executeLogin(auth: IAuth): Observable<IAuthenticationResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<IAuthenticationResponse>(this.baseUrl + '/login', auth, { headers });
  }

  executeRegister(auth: IAuth): Observable<IAuthenticationResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<IAuthenticationResponse>(`${this.baseUrl}/register`, auth, { headers });
  }
}
