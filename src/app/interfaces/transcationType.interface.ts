export interface TransactionType {
  value: string;
  name: string;
  type: string;
}

export const transactionType: TransactionType[] = [
  {
    value: 'BRANCH_DEPOSIT',
    name: 'BRANCH DEPOSIT',
    type: 'deposit',
  },
  {
    value: 'ATM_DEPOSIT',
    name: 'ATM DEPOSIT',
    type: 'deposit',
  },
  {
    value: 'TRANSFER_DEPOSIT',
    name: 'TRANSFER DEPOSIT',
    type: 'deposit',
  },
  {
    value: 'PHYSICAL_PURCHASE',
    name: 'PHYSICAL PURCHASE',
    type: 'withdrawal',
  },
  {
    value: 'WEB_PURCHASE',
    name: 'WEB PURCHASE',
    type: 'withdrawal',
  },
  {
    value: 'ATM_WITHDRAWAL',
    name: 'ATM WITHDRAWAL',
    type: 'withdrawal',
  },
];
