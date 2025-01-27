import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../../core/services/account.service';
import { AlertService } from '../../../../core/services/alert.service';
import { MinimalisticTableComponent } from '../../../../shared/components/minimalistic-table/minimalistic-table.component';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-account',
  imports: [CommonModule, ReactiveFormsModule, MinimalisticTableComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  
  accountForm: FormGroup;
  submitted = false;
  accountService = inject(AccountService);
  alertService = inject(AlertService);
  userService = inject(UserService);
  columns = ['Account Number', 'Balance'];
  data: any[] = [];
  users: any[] = [];

  constructor(private fb: FormBuilder) {
    const userId = '';
    this.accountForm = this.fb.group({
      userId: [userId, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadUsers();
  }

  get f() {
    return this.accountForm.controls;
  }

  loadAccounts() {

    this.accountService.getAll().subscribe({
      next: (accounts) => {
        this.data = accounts.map(account => ({
          'Account Number': account.accountNumber,
          'Balance': account.balance
        }));
      },
      error: () => this.alertService.showAlert('Error loading accounts', 'error')
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => this.alertService.showAlert('Error loading users', 'error')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountForm.valid) {
      this.accountService
        .createAccount(this.accountForm.value.userId)
        .subscribe({
          next: () => {
            this.alertService.showAlert(
              'Account created successfully',
              'success'
            );
            this.loadAccounts();
            this.accountForm.reset({ userId: this.accountForm.value.userId });
            this.submitted = false;
          },
          error: () =>
            this.alertService.showAlert('Failed to create account', 'error'),
        });
    }
  }

}
