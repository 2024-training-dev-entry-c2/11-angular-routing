import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountRequest, IAccountResponse } from '../interfaces/account.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mainUrl =  'http://localhost:8080/api/v1/account';

  constructor(
    private http: HttpClient
  ) { }

  getAccounts(): Observable<IAccountResponse[]>{

    return this.http.get<IAccountResponse[]>(this.mainUrl);
    

  }
  getAccountsByOwner(ownerName: string): Observable<IAccountResponse[]>{
    return this.http.post<IAccountResponse[]>(`${this.mainUrl}/byOwner`, {ownerName});
  }

  createAccount(account: IAccountRequest): Observable<IAccountResponse>{
    return this.http.post<IAccountResponse>(`${this.mainUrl}/create`,  account);
  }
}
