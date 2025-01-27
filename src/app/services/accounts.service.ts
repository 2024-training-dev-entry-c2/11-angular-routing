import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../interfaces/account.interface';
import { IUserAccount } from '../interfaces/user-account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private baseUrl = environment.apiUrl + '/accounts';

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<IUserAccount[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<IUserAccount[]>(this.baseUrl, { headers });
  }

  createAccount(account: any): Observable<Account> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Account>(this.baseUrl, account, { headers });
  }

  getAccount(accountNumber: string): Observable<Account> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Account>(`${this.baseUrl}/${accountNumber}`, { headers });
  }

  getAllAccountsByUser(userId: string): Observable<Account[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Account[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }
}
