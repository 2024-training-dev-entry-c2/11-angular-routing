import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Observable } from 'rxjs';
import { handleHttpError } from './config/error-handler.operator';
import {
  TransactionRequest,
  TransactionResponse,
} from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiBaseUrl()}/transactions`;
  }

  getAllByAccountNumber(
    accountNumber: string
  ): Observable<TransactionResponse[]> {
    return this.http
      .get<TransactionResponse[]>(`${this.apiUrl}/${accountNumber}/account`)
      .pipe(handleHttpError());
  }

  create(transaction: TransactionRequest): Observable<TransactionResponse> {
    return this.http
      .post<TransactionResponse>(`${this.apiUrl}`, transaction)
      .pipe(handleHttpError());
  }
}
