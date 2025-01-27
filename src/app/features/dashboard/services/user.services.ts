import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { AuthService } from '../../auth/services/auth.services';
import { UserAccount } from '../interfaces/user-account.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  

  getUsers(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.API_URL);
  }

  createUser(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.API_URL, user);
  }
}
