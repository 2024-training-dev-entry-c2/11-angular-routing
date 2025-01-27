import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Observable } from 'rxjs';
import { UserRequest, UserResponse } from '../interfaces/user.interface';
import { handleHttpError } from './config/error-handler.operator';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/users`;
  }

  getAll(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl).pipe(handleHttpError());
  }

  create(user: UserRequest): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.apiUrl, user)
      .pipe(handleHttpError());
  }
}
