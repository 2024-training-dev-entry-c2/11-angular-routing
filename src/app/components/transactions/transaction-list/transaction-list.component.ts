import { Component, input } from '@angular/core';
import { TransactionResponse } from '../../../interfaces/transaction.interface';
import { CommonModule } from '@angular/common';
import {
  transactionType,
  TransactionType,
} from '../../../interfaces/transcationType.interface';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  transactions = input<TransactionResponse[]>();

  getTypeName(value: string): string {
    const type = transactionType.find((type) => type.value === value);
    return type ? type.name : '';
  }

  getType(value: string): string {
    const type = transactionType.find((type) => type.value === value);
    return type ? type.type : 'deposit';
  }
}
