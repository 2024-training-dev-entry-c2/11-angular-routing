import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/admin`;
  userSignal = signal<string | null>(null); 
  tokenSignal = signal<string | null>(null); 

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuth();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) => this.handleAuthSuccess(response)),
        catchError(this.handleError)
      );
  }

  register(email: string, password: string, role: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, { email, password, role })
      .pipe(
        tap((response) => this.handleAuthSuccess(response)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/auth']);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.userSignal.set(response.email);
    this.tokenSignal.set(response.token);
    localStorage.setItem('email', response.email);
    localStorage.setItem('token', response.token);
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth error:', error);
    return throwError(() => new Error(error.error?.message || 'Authentication failed'));
  }

  checkAuth(): void {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (storedToken) {
      this.tokenSignal.set(storedToken);
    }

    if (storedEmail) {
      this.userSignal.set(storedEmail);
    }

    
  }
  
}
