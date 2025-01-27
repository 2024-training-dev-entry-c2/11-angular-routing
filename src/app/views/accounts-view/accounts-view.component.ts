import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardInfoComponent } from '../../components/card-info/card-info.component';
import {
  Transaction,
  TransactionTableComponent,
} from '../../components/transaction-table/transaction-table.component';
import { ApiService } from '../../services/api.service';
import { catchError, delay, map, of, Subscription, switchMap, tap } from 'rxjs';
import { IAccountResponse } from '../../interfaces/account.interface';
import { LoaderService } from '../../services/loader.service';
import { TransactionsService } from '../../services/transactions.service';
import { ITransactionResponse } from '../../interfaces/tansaction.interface';
import { UserInfoService } from '../../services/user-info.service';
import { AccountsInfoComponent } from '../../components/accounts-info/accounts-info.component';
import { CardsService } from '../../services/cards.service';
import { ICardResponse } from '../../interfaces/card.interface';
import { IState, StateService } from '../../services/state.service';
import { AccountService } from '../../services/account.service';

export interface IAccountsInfo {
  icon: string;
  accountNumber: string;
  balance: number;
  title: 'Bank Account' | string;
  expire?: string;
}

export interface IGetSiempleRequest {
  accountNumber: string;
  cardNumber: string;
  ownerName: string;
}

@Component({
  selector: 'app-accounts-view',
  imports: [
    CardInfoComponent,
    TransactionTableComponent,
    AccountsInfoComponent,
  ],
  templateUrl: './accounts-view.component.html',
  styleUrl: './accounts-view.component.scss',
})
export class AccountsViewComponent implements OnInit, OnDestroy {
  accounts: IAccountsInfo[] = [];
  cards: IAccountsInfo[] = [];

  transactions: Transaction[] = [];
  fistAccount: string = '';
  username: string = '';

  private stateSubscription: Subscription;

  constructor(
    private api: ApiService,
    private loader: LoaderService,
    private transactionServica: TransactionsService,
    private userService: UserInfoService,
    private cardService: CardsService,
    private stateService: StateService,
    private accountService: AccountService
  ) {
    this.username = this.userService.getUserInfo()?.username;
    this.stateSubscription = this.stateService.state$.subscribe(
      (state: IState) => {
        if (state.isUpdated) {
          switch (state.resource) {
            case 'account':
              of(1)
                .pipe(
                  tap(() => this.loader.show()),
                  delay(4000),
                  tap(() => this.getAccounts())
                )
                .subscribe(() => this.loader.hide());

              break;
            case 'transaction':
              of(1)
                .pipe(
                  tap(() => this.loader.show()),
                  delay(7000),
                  tap(() => this.getAccounts(false)),
                  tap(() =>
                    this.handleClick(state.resourceDetail?.accountNumber!)
                  )
                )
                .subscribe(() => this.loader.hide());

                break;
            case 'card':
              of(1)
                .pipe(
                  tap(() => this.loader.show()),
                  delay(4000),
                  tap(() => this.getAccounts(false)),
                  tap(() =>
                    this.handleClick(state.resourceDetail?.accountNumber!)
                  )
                )
                .subscribe(() => this.loader.hide());
              break;
          }
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(handleClick: boolean=true) {
    this.loader.show();
    this.api
      .getAccountsByOwner(this.username)
      .pipe(
        map((response) => {
          this.accounts = response.reverse().map((item: IAccountResponse) => {
            return {
              icon: 'fa fa-bank',
              accountNumber: item.accountNumber,
              balance: item.accountBalance,
              title: 'Bank Account',
            };
          });

          const accountNumbers = this.accounts.map(
            (account) => {
              return {accountNumber: account.accountNumber, balance: account.balance}
            }
          );
          const cardsNumbers: { [key: string]: string[] } = {};

          this.accountService.saveAccountData({ accountNumbers, cardsNumbers });
          this.accountService.updateCardsForAllAccounts().subscribe();
        }),
        catchError((err) => {
          console.log(err);
          return of([]);
        }),
        tap(() => this.loader.hide()),
        tap(() => handleClick && this.handleClick(this.accounts[0].accountNumber))
      )
      .subscribe();
  }

  handleClick(accountNumber: string): void {
    const request = {
      accountNumber: accountNumber,
      cardNumber: '',
      ownerName: this.username,
    };

    this.userService.updateUserInfo('accountNumber', accountNumber);

    this.cardService
      .getCardsByAccount(accountNumber)
      .pipe(
        map((response) => {
          this.cards = response.map((item: ICardResponse) => {
            return {
              icon: 'fa fa-credit-card',
              accountNumber: item.cardNumber,
              balance: item.cardLimit,
              title: item.cardName,
              expire: item.cardExpiryDate,
            };
          });
        }),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      )
      .subscribe();

    this.transactionServica
      .getTransactions(request)
      .pipe(
        map((response) => {
          this.transactions = response.reverse().map((item: ITransactionResponse) => {
            return {
              description: item.description,
              date:item.timestamp,
              type: item.transactionType,
              amount: item.amount,
              transactionFee: item.transactionFee,
              account: item.accountNumberReceiver,
            };
          });
        }),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      )
      .subscribe();
  }

  handleCardClick(cardNumber: string) {
    console.log({ cardNumber });
  }
}
