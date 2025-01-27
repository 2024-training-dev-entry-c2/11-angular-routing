import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Observable } from 'rxjs';
import {
  LoginCredentials,
  AuthResponse,
  RegisterCredentials,
} from '../interfaces/auth.interface';
import { handleHttpError } from './config/error-handler.operator';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/admin`;
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(handleHttpError());
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(handleHttpError());
  }
}
