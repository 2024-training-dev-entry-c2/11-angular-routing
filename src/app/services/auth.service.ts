import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginRequest, ILoginResponse } from '../interfaces/login.interface';
import { IUserRequest, IUserResponse } from '../interfaces/user.interface';
import { UserInfoService } from './user-info.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  mainUrl = 'http://localhost:8080/api/v1/user'
  tokenService = inject(TokenService);
  userInfoService =  inject(UserInfoService);
  accountService =  inject(AccountService);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(userData: IUserRequest): Observable<IUserResponse>{
    return this.http.post<IUserResponse>(`${this.mainUrl}/create`, userData);

  }

  login(credentials: ILoginRequest): Observable<boolean> {
    return this.http.post<ILoginResponse>(`${this.mainUrl}/authenticate`, credentials)
      .pipe(
        map((response: ILoginResponse) => {
          this.tokenService.setToken(response.token);
          this.userInfoService.setUserInfo({username: credentials.username});
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userInfoService.removeInfo();
    this.accountService.clear();
    this.router.navigate(['/login']);
  }

}
