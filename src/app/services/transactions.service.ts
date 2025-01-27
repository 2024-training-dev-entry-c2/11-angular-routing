import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransactionRequest, ITransactionResponse } from '../interfaces/tansaction.interface';
import { IGetSiempleRequest } from '../views/accounts-view/accounts-view.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private mainUrl =  'http://localhost:8080/api/v1/transaction';
  constructor(private http: HttpClient) { 

  }

  getTransactions(request: IGetSiempleRequest): Observable<ITransactionResponse[]>{
    return this.http.post<ITransactionResponse[]>(`${this.mainUrl}/byNumber`, request);
  }


  createTransaction(request: ITransactionRequest):  Observable<ITransactionResponse> {
    return this.http.post<ITransactionResponse>(`${this.mainUrl}/make`, request);
  }

  


}
