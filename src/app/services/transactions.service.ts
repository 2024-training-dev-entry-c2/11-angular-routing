import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITransaction, ITransactionRequest } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseUrl = environment.apiUrl + '/transactions';

  constructor(private http: HttpClient) { }

  createTransaction(transactionRequest: ITransactionRequest): Observable<ITransaction> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<ITransaction>(`${this.baseUrl}`, transactionRequest, { headers });
  }

  getTransactions(accountNumber: string): Observable<ITransaction[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<ITransaction[]>(`${this.baseUrl}/${accountNumber}/account`, { headers });
  }
}
