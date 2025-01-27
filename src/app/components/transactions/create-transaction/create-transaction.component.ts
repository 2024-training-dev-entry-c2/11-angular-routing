import { Component, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountResponse } from '../../../interfaces/account.interface';
import { AccountService } from '../../../services/account.service';
import { TransactionRequest } from '../../../interfaces/transaction.interface';
import {
  transactionType,
  TransactionType,
} from '../../../interfaces/transcationType.interface';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ButtonsComponent } from '../../form/buttons/buttons.component';

@Component({
  selector: 'app-create-transaction',
  imports: [
    ReactiveFormsModule,
    DialogConfirmationComponent,
    CommonModule,
    ModalComponent,
    ButtonsComponent,
  ],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
})
export class CreateTransactionComponent {
  close = output();
  create = output<TransactionRequest>();
  accounts!: AccountResponse[];
  dialogConfirm: boolean = false;

  transactionForm: FormGroup;
  transactionTypes: TransactionType[] = transactionType;

  formErrors = {
    amountError: false,
    typeError: false,
  };

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.transactionForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          this.greaterThanZeroValidator(),
        ],
      ],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  onClose(): void {
    this.close.emit();
  }

  private loadAccounts() {
    this.accountService.getAll().subscribe({
      next: (response) => (this.accounts = response),
      error: (error) => console.error('Error loading accounts:', error),
    });
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.onSubmit();
      this.closeModalConfirm();
    } else {
      this.closeModalConfirm();
    }
  }

  openModalConfirm() {
    this.formErrors.amountError = false;
    this.formErrors.typeError = false;
    if (this.transactionForm.valid) {
      this.dialogConfirm = true;
    } else {
      if (this.transactionForm.get('amount')?.invalid) {
        this.formErrors.amountError = true;
      }
      if (this.transactionForm.get('type')?.invalid) {
        this.formErrors.typeError = true;
      }
    }
  }

  closeModalConfirm() {
    this.dialogConfirm = false;
  }

  onSubmit(): void {
    this.create.emit(this.transactionForm.value);
  }

  onValueChange(value: keyof typeof this.formErrors) {
    this.formErrors[value] = false;
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  greaterThanZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      if (isNaN(Number(value))) {
        return null;
      }

      if (Number(value) <= 0) {
        return { greaterThanZero: true };
      }

      return null;
    };
  }
}
