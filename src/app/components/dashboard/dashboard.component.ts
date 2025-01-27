import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { IUserAccount } from '../../interfaces/user-account.interface';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CreateAccountModalComponent } from "../create-account-modal/create-account-modal.component";
import { delay, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule, FooterComponent, HeaderComponent, CreateAccountModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  username: string | null = "ADMIN";
  accounts: IUserAccount[] = [];
  isModalOpen = false;

  constructor(private authService: AuthService, private router: Router, private userAccountService: AccountsService, private toasterService: ToastrService) { }

  ngOnInit(): void {
    const user = this.authService.decodeToken();
    this.username = user?.sub;
    this.loadAccounts();
  }

  loadAccounts() {
    this.userAccountService.getAllAccounts().subscribe({
      next: (accounts) => {
        console.log(accounts);
        this.accounts = accounts;
      }
    })
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    var lastItemsLength: number = this.accounts.length;
    var ItemsLength: number = this.accounts.length;

    of(null).pipe(
      delay(1500),
      switchMap(() => this.userAccountService.getAllAccounts())
    ).subscribe(accounts => {
      ItemsLength = accounts.length;

      if (ItemsLength === lastItemsLength + 1) {
        this.toasterService.success('Cuenta creada exitosamente');
        this.accounts = accounts;
      }
    });
  }
}
