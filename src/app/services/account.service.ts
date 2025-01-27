import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Observable } from 'rxjs';
import { handleHttpError } from './config/error-handler.operator';
import {
  AccountRequest,
  AccountResponse,
} from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/accounts`;
  }

  getAll(): Observable<AccountResponse[]> {
    return this.http
      .get<AccountResponse[]>(this.apiUrl)
      .pipe(handleHttpError());
  }

  create(account: AccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.apiUrl, account);
  }
}
