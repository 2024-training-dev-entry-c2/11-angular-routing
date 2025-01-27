import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account, AccountService } from '../../../../core/services/account.service';
import { AlertService } from '../../../../core/services/alert.service';
import { TransactionService } from '../../../../core/services/transaction.service';
import { MinimalisticTableComponent } from '../../../../shared/components/minimalistic-table/minimalistic-table.component';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-transaction',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MinimalisticTableComponent
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  transactionForm: FormGroup;
  submitted = false;
  transactionService = inject(TransactionService);
  alertService = inject(AlertService);
  accountService = inject(AccountService);
  accounts: Account[] = [];
  selectedCustomerId: string = '';

  columns = [
                'id',
                'Type',
                'Amount',
                'Fee',
                'Date'
            ];

  data: any[] = [];

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      type: ['BRANCH_DEPOSIT', Validators.required],
      accountNumber: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]]
    });
    
  }

  ngOnInit() {
    this.loadTransactions();
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAll().subscribe(accounts => {
      this.accounts = accounts;
      if(accounts.length > 0) {
        this.transactionForm.patchValue({
          accountNumber: accounts[0].accountNumber
        });
      }
    });
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.data = transactions.map((tx) => ({
          id: tx.id,
          Type: tx.type,
          Account: tx.accountNumber,
          Amount: tx.netAmount,
          Fee: tx.fee,
          Date: new Date(tx.timestamp).toLocaleString(),
        }));
      },
    });
  }
  
  onSubmit() {

    this.submitted = true;
    if (this.transactionForm.valid) {
      // Create transaction payload with customer ID
      const transactionPayload = {
        ...this.transactionForm.value,
        customerId: this.selectedCustomerId
      };

      this.transactionService
        .createTransaction(transactionPayload)
        .subscribe({
          next: () => {
            this.alertService.showAlert(
              'Transaction created successfully',
              'success'
            );
            this.loadTransactions();
            this.submitted = false;
          },
          error: () =>
            this.alertService.showAlert(
              'Failed to create transaction',
              'error'
            ),
        });
    }
  }
}