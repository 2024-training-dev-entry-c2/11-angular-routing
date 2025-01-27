import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountResponse } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _selectedAccount = new BehaviorSubject<AccountResponse | null>(null);
  public selectedAccount$ = this._selectedAccount.asObservable();

  private _accounts = new BehaviorSubject<AccountResponse[]>([]);
  public accounts$ = this._accounts.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  private _errorMessage = new BehaviorSubject<string>('');
  public errorMessage$ = this._errorMessage.asObservable();

  private _error = new BehaviorSubject<boolean>(false);
  public error$ = this._error.asObservable();

  constructor() {}

  setSelectedAccount(account: AccountResponse) {
    this._selectedAccount.next(account);
  }

  setAccounts(accounts: AccountResponse[]) {
    this._accounts.next(accounts);
  }

  setLoading(state: boolean) {
    this._loading.next(state);
  }

  setErrorMessage(message: string) {
    this._errorMessage.next(message);
  }

  setError(error: boolean) {
    this._error.next(error);
  }

  updateBalance(balance: number, accountNumber: string) {
    const currentAccounts = this._accounts.value;
    const updatedAccounts = currentAccounts.map((account) => {
      if (account.accountNumber === accountNumber) {
        return { ...account, balance };
      }
      return account;
    });

    this._accounts.next(updatedAccounts);

    const currentSelectedAccount = this._selectedAccount.value;
    if (
      currentSelectedAccount &&
      currentSelectedAccount.accountNumber === accountNumber
    ) {
      const updatedSelectedAccount = { ...currentSelectedAccount, balance };
      this.setSelectedAccount(updatedSelectedAccount);
    }
  }
}
