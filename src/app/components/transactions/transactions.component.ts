import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import {
  TransactionRequest,
  TransactionResponse,
} from '../../interfaces/transaction.interface';
import { TransactionService } from '../../services/transaction.service';
import { AccountResponse } from '../../interfaces/account.interface';
import {
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Subscription,
} from 'rxjs';
import { DataService } from '../../core/data.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  imports: [
    CreateTransactionComponent,
    TransactionListComponent,
    SpinnerComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit, OnDestroy {
  isCreateModalOpen: boolean = false;
  transactions: TransactionResponse[] = [];
  selectedAccount!: AccountResponse | null;
  private subscription: Subscription | undefined;
  isLoading: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataService.selectedAccount$
      .pipe(
        filter((account) => !!account),
        distinctUntilChanged(
          (prevAccount, currentAccount) =>
            prevAccount?.accountNumber === currentAccount?.accountNumber
        ),
        map((account) => account!)
      )
      .subscribe((account) => {
        this.selectedAccount = account;
        if (this.selectedAccount) {
          this.loadTransactions(this.selectedAccount.accountNumber);
        }
      });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  onCreateTransaction(newTransaction: TransactionRequest): void {
    const transaction: TransactionRequest = {
      ...newTransaction,
      accountNumber: this.selectedAccount!.accountNumber,
    };

    this.dataService.setLoading(true);
    this.transactionService
      .create(transaction)
      .pipe(finalize(() => this.dataService.setLoading(false)))
      .subscribe({
        next: (response) => {
          this.dataService.updateBalance(
            response.balance,
            this.selectedAccount!.accountNumber
          );
          this.transactions.push(response);
        },
        error: (error: HttpErrorResponse) => {
          if (
            error.status === 400 &&
            error.error &&
            error.error.error === 'Insufficient balance for this transaction.'
          ) {
            this.dataService.setErrorMessage(
              'Insufficient balance for this transaction'
            );
          } else {
            this.dataService.setErrorMessage('Error creating transaction');
          }
          this.dataService.setError(true);
        },
      });
    this.closeCreateModal();
  }

  loadTransactions(accountNumber: string) {
    this.isLoading = true;
    this.transactionService
      .getAllByAccountNumber(accountNumber)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => (this.transactions = response),
        error: () => {
          this.dataService.setErrorMessage('Error loading transactions');
          this.dataService.setError(true);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
