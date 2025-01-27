import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CardsService } from './cards.service';

export interface IAccountData {
  accountNumbers: {accountNumber: string,  balance: number}[];
  cardsNumbers: { [key: string]: string[] };
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  storageKey: string = 'accountData';

  constructor(private cardService: CardsService) {}

  saveAccountData(
    data: IAccountData
  ) {
    const localStorageData = {
      accountNumbers: data.accountNumbers,
      cardsNumbers: data.cardsNumbers,
    };

    localStorage.setItem(this.storageKey, JSON.stringify(localStorageData));
  }

  getAccountData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  updateCardsForAllAccounts() {
    const localStorageData: IAccountData = this.getAccountData();

    if (!localStorageData || !localStorageData.accountNumbers) {
      return of([]);
    }

    return new Observable((observer) => {
      let remainingAccounts = localStorageData.accountNumbers.length;

      localStorageData.accountNumbers.forEach((account) => {
        this.cardService
          .getCardsByAccount(account.accountNumber)
          .pipe(
            catchError((err) => {
              console.log(err);
              return of([]); 
            })
          )
          .subscribe((cards) => {
            if (localStorageData.cardsNumbers[account.accountNumber]) {
              localStorageData.cardsNumbers[account.accountNumber].push(
                ...cards.map((card) => card.cardNumber)
              );
            } else {
              localStorageData.cardsNumbers[account.accountNumber] = cards.map(
                (card) => card.cardNumber
              );
            }

            remainingAccounts--;

            if (remainingAccounts === 0) {
              this.saveAccountData(
                localStorageData
              );
              observer.next(localStorageData);
              observer.complete();
            }
          });
      });
    });
  }


  clear(){
    localStorage.removeItem(this.storageKey);
    
  }
}
