import { Injectable } from '@angular/core';
import { IAuth } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(credentials: IAuth): boolean {
    if (
      credentials.username === environment.adminUsername &&
      credentials.password === environment.adminPassword
    ) {
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }
}
