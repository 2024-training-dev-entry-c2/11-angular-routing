import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AccountRequest,
  AccountResponse,
} from '../../interfaces/account.interface';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faUniversity,
  faMoneyBillWave,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DataService } from '../../core/data.service';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FontAwesomeModule, CreateAccountComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: AccountResponse[] = [];
  isCreateModalOpen: boolean = false;
  private subscription: Subscription | undefined;

  faUser = faUser;
  faUniversity = faUniversity;
  faMoneyBillWave = faMoneyBillWave;
  faIdCard = faIdCard;

  constructor(
    private accountService: AccountService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subscription = this.dataService.accounts$.subscribe((accounts) => {
      this.accounts = accounts!;
    });
  }

  onCreateAccount(newAccount: AccountRequest): void {
    this.dataService.setLoading(true);
    this.accountService
      .create(newAccount)
      .pipe(finalize(() => this.dataService.setLoading(false)))
      .subscribe({
        next: (response) => {
          this.accounts.push(response);
          this.dataService.setAccounts(this.accounts);
        },
        error: () => {
          this.dataService.setErrorMessage('Error creating account');
          this.dataService.setError(true);
        },
      });
    this.closeCreateModal();
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
