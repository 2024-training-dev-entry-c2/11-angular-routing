import {
  Component,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { AccountResponse } from '../../../interfaces/account.interface';
import { DataService } from '../../../core/data.service';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  imports: [FontAwesomeModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnChanges, OnInit, OnDestroy {
  accounts = input<AccountResponse[]>();

  faUserPlus = faUserPlus;

  selectedAccount: AccountResponse | null = null;
  showDropdown: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.selectedAccount$.subscribe(
      (account) => {
        this.selectedAccount = account;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['accounts'] &&
      this.accounts() &&
      this.accounts()!.length > 0 &&
      !this.selectedAccount
    ) {
      this.selectedAccount = this.accounts()![0];
      this.dataService.setSelectedAccount(this.accounts()![0]);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectAccount(account: AccountResponse) {
    this.selectedAccount = account;
    this.dataService.setSelectedAccount(account);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
