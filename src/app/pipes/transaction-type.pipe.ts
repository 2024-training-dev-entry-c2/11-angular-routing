import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: string): string {
    const typeMap: { [key: string]: string } = {
      BD: 'Branch Deposit',
      ATM: 'ATM Transaction',
      BA: 'Between Account',
      SP: 'Store Purchase',
      WP: 'Web Purchase',
    };

    return typeMap[value] || 'Unknown Transaction';
  }

}
