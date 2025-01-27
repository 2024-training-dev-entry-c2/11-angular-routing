import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../interfaces/account.interface';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction } from '../../interfaces/transaction.interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogService } from '../../services/dialog.service';
import { catchError, concatMap, delay, map, of, switchMap, tap, throwError } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-account-detail',
  imports: [ReactiveFormsModule, CommonModule, ConfirmationDialogComponent, HeaderComponent, FooterComponent],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent {
  accountNumber: string | null = null;
  account: Account | null = null;
  user: IUser | null = null;
  transactions: ITransaction[] = [];
  transactionForm: FormGroup;
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountsService);
  private transactionService = inject(TransactionsService);
  private userService = inject(UsersService);
  //dialog
  isDialogOpen: boolean = false;
  private dialogService = inject(DialogService);

  constructor(private toastr: ToastrService, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: [0, Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accountNumber = params['accountNumber'];
      if (this.accountNumber) {
        this.loadAccountData();
      }
    });
  }

  loadAccountData() {
    console.log(this.accountNumber);
    if (this.accountNumber) {
      this.accountService.getAccount(this.accountNumber).pipe(
        switchMap(account => {
          console.log("Account:", account);
          this.account = account;

          // Obtener el usuario usando la función actualizada
          return this.userService.getUserById(account.userId);
        }),
        switchMap(user => {
          if (!user) {
            throw new Error("Usuario no encontrado");
          }
          console.log("User:", user);
          this.user = user;

          // Obtener las transacciones después de obtener el usuario
          return this.transactionService.getTransactions(this.account?.accountNumber ?? '');
        })
      ).subscribe(
        transactions => {
          console.log("Transactions:", transactions);
          this.transactions = transactions;
        },
        error => {
          console.error("Error:", error);
        }
      );
    }
  }

  openConfirmationDialog() {
    if (this.account) {
      this.isDialogOpen = true;
      this.dialogService.openDialog(ConfirmationDialogComponent, {
        message: `¿Está seguro de realizar esta transacción de ${this.transactionForm.value.type} por  ${this.transactionForm.value.amount} ?`
      }).then(confirmed => {
        this.isDialogOpen = false;
        console.log("Se obtuvo el valor de confirmacion", confirmed);
        if (confirmed) {
          this.submitTransaction()
        }
      });
    }
  }

  submitTransaction() {
    if (this.account) {
      const transactionData = {
        ...this.transactionForm.value,
        accountNumber: this.account.accountNumber,
      };
      this.transactionService.createTransaction(transactionData)
        .pipe(
          delay(2000),
          concatMap(result => {
            if (result) {
              this.loadAccountData();
            }
            return of(null);
          }),
          catchError(error => {
            console.error("Error en la transacción:", error);

            // Muestra un mensaje de error al usuario
            this.toastr.error(error.error?.error || 'Ocurrió un error inesperado.');

            return throwError(() => error);  // Relanzar el error si es necesario
          })
        )
        .subscribe(() => {
          
          // this.loadAccountData();
          this.toastr.success('Transacción realizada con éxito.');
          this.transactionForm.reset(
            {
              type: '',
              amount: 0
            }
          );
        });
    }
  }
}