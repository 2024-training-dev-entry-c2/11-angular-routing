import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { AuthService } from '../../features/auth/services/auth.services';

export interface Account {
 id: string;
 userId: string;
 accountNumber: string;
 balance: string;
}

@Injectable({
 providedIn: 'root'
})
export class AccountService {
 private http = inject(HttpClient);
 authService = inject(AuthService);
 private apiUrl = `${environment.apiUrl}/accounts`;



 createAccount(userId: string): Observable<Account> {
   return this.http.post<Account>(this.apiUrl, { userId });
 }

 getAll(): Observable<Account[]> {
   return this.http.get<Account[]>(`${this.apiUrl}/" "`);
 }

}