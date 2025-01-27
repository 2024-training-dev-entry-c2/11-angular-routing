import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRequestDTO, IResponseDTO } from '../../interfaces/accountinterface';
import { AccountService } from '../../service/account.service';
import { TableComponent } from '../../components/table/table.component';
import { AlertService } from '../../service/alert.service';
import { delay, of, Subject, takeUntil, tap } from 'rxjs';
import { AccountModalComponent } from '../../components/account-modal/account-modal.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-accounts',
  imports: [
    TableComponent,
    AccountModalComponent,
    AlertComponent,
    LoaderComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit, OnDestroy {
  tableHeaders: any[] = [
    // { property:'customerId',label:'Customer ID'},
    // { property:'accountId',label:'Account ID'},
    { property: 'accountName', label: 'Name' },
    { property: 'accountNumber', label: 'Numero Cuenta' },
    { property: 'balance', label: 'Balance' },
    { property: 'status', label: 'Status' },
  ];

  tableData: IResponseDTO[] = [];
  showModal = false;
  opciones = true;
  loader = false;

  showAlert = false;
  alertMessage = '';
  alertType = '';

  selectedAccount: IResponseDTO | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private accountsService: AccountService,
    private alertService: AlertService
  ) {
    this.alertService.alert$
      .pipe(takeUntil(this.destroy$))
      .subscribe((alert) => {
        if (alert) {
          this.showAlert = true;
          this.alertMessage = alert.message;
          this.alertType = alert.type;
        } else {
          this.showAlert = false;
        }
      });
  }

  ngOnInit(): void {
    of(1)
      .pipe(
        tap(() => (this.loader = true)),
        delay(2000),
        tap(() => (this.loader = false))
      )
      .subscribe();
    this.getAllAccounts();
  }
  createAccount() {
    this.selectedAccount = null;
    this.showModal = true;
  }
  getAllAccounts() {
    this.accountsService
      .getAllAccounts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.tableData = response;
      });
  }
  updateAccount(account: IResponseDTO) {
    this.selectedAccount = account;
    this.showModal = true;
  }

  searchAccount(account: IResponseDTO) {
    const search: IRequestDTO = {
      accountNum: account.accountNumber,
      customerId: account.customerId,
    };
    this.accountsService.getAccountByNumber(search).subscribe((response) => {
      this.tableData = [response];
    });
  }
  deleteAccount(account: IResponseDTO) {}

  closeModal() {
    this.showModal = false;
    this.getAllAccounts();
  }

  closeAlert() {
    this.showAlert = false;
    this.alertService.closeAlert();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
