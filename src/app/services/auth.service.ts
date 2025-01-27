import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthenticationResponse, IAuth } from '../interfaces/auth.interface';
import { AdminService } from './admin.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private adminService: AdminService) {
    this.loadToken(); // Carga el token al inicio para mantener sesión
  }

  register(auth: IAuth): Observable<IAuthenticationResponse> {
    return this.adminService.executeRegister(auth).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  login(auth: IAuth): Observable<IAuthenticationResponse> {
    return this.adminService.executeLogin(auth).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  loadToken() {
    const token = this.getToken();
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
  decodeToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token: ', error);
      return null
    }
  }
}
