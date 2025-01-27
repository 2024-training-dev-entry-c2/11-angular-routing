import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAdmin } from '../../interfaces/admin.interface';
import { Router } from '@angular/router';
import { AccountResponse } from '../../interfaces/account.interface';
import { DataService } from '../../core/data.service';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  admin!: IAdmin;
  selectedAccount: AccountResponse | null = null;
  subscription: Subscription | undefined;

  faMoneyBillWave = faMoneyBillWave;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('user')!);
    this.subscription = this.dataService.selectedAccount$.subscribe(
      (account) => {
        this.selectedAccount = account;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
