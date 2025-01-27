import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ICardRequest, ICardResponse } from '../interfaces/card.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private mainUrl = 'http://localhost:8080/api/v1/card';

  constructor(
    private http: HttpClient
  ) { }


  getCardsByAccount(accountNumber: string): Observable<ICardResponse[]> {

    return this.http.post<ICardResponse[]>(`${this.mainUrl}/byAccount`, { accountNumber });


  }


  createCard(request: ICardRequest): Observable<ICardResponse> {

    return this.http.post<ICardResponse>(`${this.mainUrl}/create`, request);

    
  }
}
