export interface Transaction {
    id:string,
    type: 'ATM_DEPOSIT' | 'ATM_WITHDRAWAL' | 'BRANCH_DEPOSIT' | 'PHYSICAL_PURCHASE' | 'TRANSFER_DEPOSIT' | 'WEB_PURCHASE';
    accountNumber: string;
    customerId: string;
    fee: number;
    netAmount: number;
    timestamp: string;
   }