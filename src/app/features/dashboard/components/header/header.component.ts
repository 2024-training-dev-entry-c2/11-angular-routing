import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../../core/services/account.service';
import { AuthService } from '../../../auth/services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = inject(AuthService);
  accountService = inject(AccountService);
  
  userLogged = this.user.userSignal();
  totalBalance = 0;

  ngOnInit() {
    this.loadTotalBalance();
  }

  loadTotalBalance() {
    this.accountService.getAll().subscribe({
      next: (accounts) => {
        this.totalBalance = accounts.reduce((sum, account) => {
          return sum + parseFloat(account.balance || '0');
        }, 0);
      },
      error: (error) => {
        console.error('Error loading balances:', error);
      }
    });
  }

  logout(): void {
    this.user.logout();
  }
}