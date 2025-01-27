import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AccountResponse } from '../../interfaces/account.interface';
import { AccountService } from '../../services/account.service';
import { RouterLink } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import {
  faTachometerAlt,
  faUsers,
  faBuilding,
  faExchangeAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataService } from '../../core/data.service';

interface Link {
  name: string;
  link: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-sidebar',
  imports: [DropdownComponent, RouterLink, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  accounts!: AccountResponse[];
  private subscription: Subscription | undefined;

  faTachometerAlt = faTachometerAlt;
  faUsers = faUsers;
  faBuilding = faBuilding;
  faExchangeAlt = faExchangeAlt;

  links: Link[] = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: faTachometerAlt,
    },
    {
      name: 'Users',
      link: '/users',
      icon: faUsers,
    },
    {
      name: 'Accounts',
      link: '/accounts',
      icon: faBuilding,
    },
    {
      name: 'Transactions',
      link: '/transactions',
      icon: faExchangeAlt,
    },
  ];

  constructor(
    private accountService: AccountService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subscription = this.dataService.accounts$.subscribe((accounts) => {
      this.accounts = accounts!;
    });

    this.loadAccounts();
  }

  private loadAccounts() {
    this.dataService.setLoading(true);
    this.accountService
      .getAll()
      .pipe(finalize(() => this.dataService.setLoading(false)))
      .subscribe({
        next: (response) => {
          this.accounts = response;
          this.dataService.setAccounts(this.accounts);
        },
        error: () => {
          this.dataService.setErrorMessage('Error loading accounts');

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
