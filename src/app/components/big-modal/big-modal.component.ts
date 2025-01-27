import {
  Component,
  EventEmitter,
  HostListener,
  input,
  Input,
  OnDestroy,
  OnInit,
  output,
  Output,
  TemplateRef,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { catchError, Subscription, tap, throwError } from 'rxjs';
import { IModalActions } from '../icon-button/icon-button.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { InputFormComponent } from '../input-form/input-form.component';
import { ApiService } from '../../services/api.service';
import { LoaderService } from '../../services/loader.service';
import { UserInfoService } from '../../services/user-info.service';
import { IAccountRequest } from '../../interfaces/account.interface';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { ICardRequest } from '../../interfaces/card.interface';
import { CardsService } from '../../services/cards.service';
import { AccountService, IAccountData } from '../../services/account.service';
import { ITransactionRequest } from '../../interfaces/tansaction.interface';
import { TransactionsService } from '../../services/transactions.service';
import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";
import { CorfimDialogService } from '../../services/corfim-dialog.service';


export interface IFormField {
  label: string;
  controlName: string;
  formGroup?: FormGroup;
  type?: string;
  options?: { label: string; value: string }[];
  inputType?: string;
}

@Component({
  selector: 'app-big-modal',
  imports: [ReactiveFormsModule, InputFormComponent, DialogConfirmComponent],
  templateUrl: './big-modal.component.html',
  styleUrl: './big-modal.component.scss',
})
export class BigModalComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  header: string = 'Information';
  closed = output<void>();
  addClass: string = '';
  formType: string = '';
  formFields: IFormField[] = [];

  accountfields: IFormField[] = [
    {
      label: 'Account Type',
      formGroup: undefined,
      controlName: 'accountType',
      type: 'select',
      options: [
        { label: 'Select', value: '' },
        { label: 'Checking account', value: 'checking' },
        { label: 'Saving account', value: 'saving' },
      ],
    },
    {
      label: 'Accounnt Balance',
      formGroup: undefined,
      controlName: 'accountBalance',
      inputType: 'number',
    },
    {
      label: 'Account Number',
      formGroup: undefined,
      controlName: 'accountNumber',
    },
  ];

  cardFields: IFormField[] = [
    {
      label: 'Card name',
      formGroup: undefined,
      controlName: 'cardName',
    },
    {
      label: 'Card  number',
      formGroup: undefined,
      controlName: 'cardNumber',
    },
    {
      label: 'Card type',
      formGroup: undefined,
      controlName: 'cardType',
      type: 'select',
      options: [
        { label: 'Select', value: '' },
        { label: 'DEBIT CARD', value: 'DEBT' },
        { label: 'CREDIT CARD', value: 'CREDIT' },
      ],
    },
    {
      label: 'Card status',
      formGroup: undefined,
      controlName: 'cardStatus',
      type: 'select',
      options: [
        { label: 'Select', value: '' },
        { label: 'ACTIVE', value: 'active' },
        { label: 'INACTIVE', value: 'inactive' },
      ],
    },
    {
      label: 'Card limit',
      formGroup: undefined,
      controlName: 'cardLimit',
      inputType: 'number',
    },
  ];

  transactionFields: IFormField[] = [];
  trySend: boolean = false;
  accountForm: FormGroup | undefined;
  cardForm: FormGroup | undefined;
  transactionForm: FormGroup | undefined
  private modalSubscription: Subscription;
  accountData: IAccountData;

  presentDialog: boolean = false;


  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private accountService: ApiService,
    private loaderService: LoaderService,
    private userService: UserInfoService,
    private toastService: ToastService,
    private stateService: StateService,
    private cardService: CardsService,
    private storageService: AccountService,
    private transactionService: TransactionsService,
    private dialogService: CorfimDialogService
  ) {
    this.accountData = this.storageService.getAccountData();
    this.modalSubscription = this.modalService.modal$.subscribe(
      (actions: IModalActions) => {
        this.visible = actions.isOpenModal;
        this.addClass = actions.modalClass;
        this.formType = actions.action;
        this.visible = actions.isOpenModal;
        this.header = actions.header;

        switch (actions.action) {
          case 'create-account':
            this.accountForm = this.fb.group({
              accountNumber: ['', Validators.required],
              accountType: ['', Validators.required],
              accountBalance: ['', Validators.required],
            });

            this.buildForm(this.accountForm!, this.accountfields);
            break;
          case 'create-card':
            this.cardForm = this.fb.group({
              cardName: ['', Validators.required],
              cardNumber: ['', Validators.required],
              cardType: ['', Validators.required],
              cardStatus: ['', Validators.required],
              cardLimit: ['', Validators.required],
            });
            this.buildForm(this.cardForm!, this.cardFields);
            break;
          case 'create-transaction':
            this.transactionForm = this.fb.group({
              description: ['', Validators.required],
              amount: ['', Validators.required],
              transactionType: ['', Validators.required],
              account: ['', Validators.required],
              card: ['', Validators.required],

              atmnName: [null, Validators.required],
              branchName: [null, Validators.required],
              website: [null, Validators.required],
              marketName: [null, Validators.required],
              accountNumberReceiver: [null, Validators.required],
            });

            this.transactionForm!.get('account')?.valueChanges.subscribe(
              (accountNumber) => {
                this.updateCardOptions(accountNumber);
              }
            );

            this.transactionForm!.get(
              'transactionType'
            )?.valueChanges.subscribe((transactionType: string) => {
              this.updateFieldsBasedOnTransactionType(transactionType);
            });

            this.transactionFields = this.transformToFormOptions(
              this.accountData
            );

            this.buildForm(this.transactionForm!, this.transactionFields);
            break;
        }
      }
    );
  }

  ngOnInit(): void { }

  buildForm(form: FormGroup, fields: IFormField[]) {
    this.formFields = fields.map((item: IFormField) => {
      return {
        ...item,
        formGroup: form,
      };
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (this.visible) {
      this.close();
    }
  }

  close() {
    this.modalService.activate({
      isOpenModal: false,
      action: 'create-account',
      modalClass: '',
      header: '',
    });
  }
  createProcess() {
    console.log("AAAAAAAAA");
    switch (this.formType) {
      case 'create-account':
        this.createTeAccount(this.accountForm!);
        break;
      case 'create-card':
        this.createCard(this.cardForm!)
        break;
      case 'create-transaction':
        this.createTransacion(this.transactionForm!)
        break;

    }
  }

  createTeAccount(form: FormGroup) {

    if (form.valid) {
      const request: IAccountRequest = {
        accountNumber: form.get('accountNumber')?.value,
        accountBalance: form.get('accountBalance')?.value,
        accountType: form.get('accountType')?.value,
        accountOwner: this.userService.getUserInfo().username,
      };
      this.accountService
        .createAccount(request)
        .pipe(
          tap(() =>
            this.toastService.emitToast(
              'Success',
              'Account created successfully',
              'success',
              true,
              4000
            )
          ),
          tap(() => this.close()),
          tap(() =>
            this.stateService.upddateState({
              isUpdated: true,
              resource: 'account',
            })
          ),
          catchError((error: HttpErrorResponse) => {
            const message = error.error?.details[0] as string;
            console.log(error.error?.details);
            switch (error.status) {
              case 500:
                this.toastService.emitToast(
                  'Error',
                  message.includes('already')
                    ? 'Account already exist'
                    : 'Some error ocurre in request',
                  'error',
                  true,
                  4000
                );
                break;
            }

            return throwError(() => error);
          })
        )
        .subscribe();
    }

  }
  createCard(form: FormGroup) {
    if (form.valid) {
      const request: ICardRequest = {
        cardName: form.get('cardName')?.value,
        cardNumber: form.get('cardNumber')?.value,
        cardType: form.get('cardType')?.value,
        cardStatus: form.get('cardStatus')?.value,
        cardExpiryDate: this.getDateInFiveYears(),
        cardLimit: form.get('cardLimit')?.value,
        cardHolderName: ` Mr(s). ${this.userService.getUserInfo().username}`,
        account: {
          accountNumber: this.userService.getUserInfo().accountNumber!,
        },
      };
      this.cardService
        .createCard(request)
        .pipe(
          tap(() =>
            this.toastService.emitToast(
              'Success',
              'Card created successfully',
              'success',
              true,
              4000
            )
          ),
          tap(() => this.close()),
          tap(() =>
            this.stateService.upddateState({
              isUpdated: true,
              resource: 'card',
              resourceDetail: {
                accountNumber: this.userService.getUserInfo().accountNumber!,
              },
            })
          ),
          catchError((error: HttpErrorResponse) => {
            const message = error.error?.details[0] as string;
            console.log(error.error?.details);
            switch (error.status) {
              case 500:
                this.toastService.emitToast(
                  'Error',
                  message.includes('already')
                    ? 'Card already exist'
                    : 'Some error ocurre in request',
                  'error',
                  true,
                  4000
                );
                break;
            }

            return throwError(() => error);
          })
        )
        .subscribe();
    }

  }

  createTransacion(form: FormGroup) {
    if (form.valid) {
      const request: ITransactionRequest = this.buildTransactionRequest(form);
      this.transactionService
        .createTransaction(request)
        .pipe(
          tap(() =>
            this.toastService.emitToast(
              'Success',
              'Transaction created successfully',
              'success',
              true,
              4000
            )
          ),
          tap(() => this.close()),
          tap(() =>
            this.stateService.upddateState({
              isUpdated: true,
              resource: 'transaction',
              resourceDetail: {
                accountNumber: request.accountNumber,
              },
            })
          ),
          catchError((error: HttpErrorResponse) => {
            const message = error.error?.details[0] as string;
            console.log(error.error?.details);
            switch (error.status) {
              case 500:
                this.toastService.emitToast(
                  'Error',
                  'Some error ocurre in request',
                  'error',
                  true,
                  4000
                );
                break;
            }

            return throwError(() => error);
          })
        )
        .subscribe();
    }

  }
  onSubmit(form: FormGroup): void {
    this.trySend = true;
    this.markAsTouched(form);
    if (form.valid) {
      this.dialogConfirm();
    }
  }

  onSubmitTransaction(form: FormGroup): void {
    this.trySend = true;
    this.markAsTouched(form);
    const accountNumber = this.transactionForm!.get('account')?.value;
    const amount = this.transactionForm!.get('amount')?.value;

    
    const selectedAccount = this.accountData.accountNumbers.find(
      (account) => account.accountNumber === accountNumber
    );

    if (selectedAccount) {
      if (amount > selectedAccount.balance) {
        this.toastService.emitToast(
          'Error',
          'Insufficient balance',
          'error',
          true,
          4000
        );
        return; 
      }
    } else {
      console.log('Account not found.');
      return; 
    }
    if (form.valid) {
      this.dialogConfirm();
    }
  }

  buildTransactionRequest(form: FormGroup): any {
    const transactionType: string = form.get('transactionType')?.value;
    const atmTransactiontype: string = transactionType === 'ATM_DEP' || transactionType === 'ATM_DET' ? "ATM" : transactionType;

    return Object.fromEntries(
      Object.entries({
        customerId: '',
        description: form.get('description')?.value,
        amount: form.get('amount')?.value,
        transactionType: atmTransactiontype,
        transactionFee: 0,
        account: {
          accountNumber: form.get('account')?.value,
        },
        card: {
          cardNumber: form.get('card')?.value,
        },
        accountNumber: form.get('account')?.value,
        website: form.get('website')?.value,
        marketName: form.get('marketName')?.value,
        atmName: form.get('atmnName')?.value,
        operationType: transactionType === 'ATM_DET' ? 'ATM_DEBIT' : 'ATM_DEPOSIT',
        branchName: form.get('branchName')?.value,
        accountReceiver: {
          accountNumber: form.get('accountNumberReceiver')?.value,
        },
        accountNumberReceiver: form.get('accountNumberReceiver')?.value,
      }).filter(([_, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return Object.values(value).some((v) => v !== '');
        }
        return value !== '';
      })
    );
  }

  markAsTouched(form: FormGroup): void {
    console.log('tocuhed', form);
    if (form) {
      Object.keys(form.controls).forEach((key) => {
        form.get(key)?.markAsTouched();
      });
    }
  }

  getDateInFiveYears(): string {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setFullYear(today.getFullYear() + 5);

    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const year = futureDate.getFullYear().toString().slice(-2);

    return `${month}/${year}`;
  }



  transformToFormOptions(accountData: IAccountData): IFormField[] {
    const transactionFields: any = [
      {
        label: 'Description',
        formGroup: undefined,
        controlName: 'description',
      },
      {
        label: 'Amount',
        formGroup: undefined,
        controlName: 'amount',
        inputType: 'number',

      },
      {
        label: 'Transaction type',
        formGroup: undefined,
        controlName: 'transactionType',
        type: 'select',
        options: [
          { label: 'Select', value: '' },
          { label: 'BRANCH DEPOSIT', value: 'BD' },
          { label: 'ATM DEPOSIT', value: 'ATM_DEP' },
          { label: 'ATM DEBIT', value: 'ATM_DET' },
          { label: 'BETWEEN ACCOUNT', value: 'BA' },
          { label: 'STORE PURCHASE', value: 'SP' },
          { label: 'WEB PURCHASE', value: 'WP' },
        ],
      },
      {
        label: 'Account',
        formGroup: undefined,
        controlName: 'account',
        type: 'select',
        options: [
          { label: 'Select', value: '' },
          ...accountData.accountNumbers.map((account) => ({
            label: `Account - ${account.accountNumber}`,
            value: account.accountNumber,
          })),
        ],
      },
      {
        label: 'Card',
        formGroup: undefined,
        controlName: 'card',
        type: 'select',
        options: [{ label: 'Select', value: '' }],
      },
    ];

    return transactionFields;
  }

  dialogConfirm() {
    this.presentDialog = true;
    this.dialogService.emitDialog("Confirm", "Are you sure to complete this action?", "Cancel", "Confirm");
  }

  updateCardOptions(accountNumber: string) {
    const cards = this.accountData.cardsNumbers[accountNumber] || [];
    console.log(this.accountData.cardsNumbers, accountNumber)
    console.log(this.accountData.cardsNumbers[accountNumber])

    const cardOptions = cards.map((card) => ({
      label: `Card ${card}`,
      value: card,
    }));

    const cardControl = this.transactionForm!.get('card');
    cardControl!.setValue('');
    cardControl!.setValidators([Validators.required]);

    this.formFields = this.formFields.map((field) => {
      if (field.controlName === 'card') {
        field.options = [{ label: 'Select', value: '' }, ...cardOptions];
      }
      return field;
    });
  }


  updateFieldsBasedOnTransactionType(transactionType: string) {
    const formControls = this.transactionForm!.controls;


    const controlsToClear = [
      'branchName',
      'atmnName',
      'marketName',
      'website',
      'accountNumberReceiver',
    ];

    controlsToClear.forEach((controlName) => {
      formControls[controlName].clearValidators();
      formControls[controlName].setValue('');
      formControls[controlName].updateValueAndValidity();
    });


    this.formFields = this.formFields.filter(
      (field) =>
        !['branchName', 'atmnName', 'marketName', 'website', 'accountNumberReceiver'].includes(
          field.controlName
        )
    );


    switch (transactionType) {
      case 'BD':
        this.formFields.push({
          label: 'Branch name',
          formGroup: this.transactionForm,
          controlName: 'branchName',
        });
        formControls['branchName'].setValidators([Validators.required]);
        break;
      case 'ATM_DEP':
      case 'ATM_DET':
        this.formFields.push({
          label: 'ATM name',
          formGroup: this.transactionForm,
          controlName: 'atmnName',
        });
        formControls['atmnName'].setValidators([Validators.required]);
        break;
      case 'BA':
        this.formFields.push({
          label: 'Account receiver',
          formGroup: this.transactionForm,
          controlName: 'accountNumberReceiver',
        });
        formControls['accountNumberReceiver'].setValidators([Validators.required]);
        break;
      case 'SP':
        this.formFields.push({
          label: 'Market name',
          formGroup: this.transactionForm,
          controlName: 'marketName',
        });
        formControls['marketName'].setValidators([Validators.required]);
        break;
      case 'WP':
        this.formFields.push({
          label: 'Website',
          formGroup: this.transactionForm,
          controlName: 'website',
        });
        formControls['website'].setValidators([Validators.required]);
        break;
    }


    this.transactionForm!.updateValueAndValidity();
    this.formFields = [...this.formFields];
  }



}
