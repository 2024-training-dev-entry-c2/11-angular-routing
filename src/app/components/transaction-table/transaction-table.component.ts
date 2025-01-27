import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TransactionTypePipe } from '../../pipes/transaction-type.pipe';
import { DefautValuePipe } from '../../pipes/defaut-value.pipe';

export interface Transaction {
  description: string;
  date: Date;
  type: string;
  amount: number;
  account?: string;
  transactionFee: number;
}


@Component({
  selector: 'app-transaction-table',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, TransactionTypePipe, DefautValuePipe],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss'
})
export class TransactionTableComponent implements OnInit, OnChanges {

  isCards = input<boolean>(false);
  transactions = input<Transaction[]>([]);

  displayedColumns: string[] = ['description', 'date', 'type', 'amount', 'account receiver', 'transaction-fee'];

  currentPage: number = 1;
  pageSize: number = 5;
  totalEntries: number = 0;
  showing = 0;
  to = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.totalEntries = this.transactions().length;
      this.showing = (this.currentPage - 1) * this.pageSize + 1;
      this.to = Math.min(this.currentPage * this.pageSize, this.totalEntries)

    }
  }

  ngOnInit(): void {

    if (this.isCards()) {
      this.displayedColumns = this.displayedColumns.filter(item => item !== 'account receiver');

    }
  }

  getPaginatedTransactions(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.transactions().slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.showing = (this.currentPage - 1) * this.pageSize + 1;
    this.to = Math.min(this.currentPage * this.pageSize, this.totalEntries)
  }

  getPagesArray(): number[] {
    const pageCount = Math.ceil(this.totalEntries / this.pageSize);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

}
