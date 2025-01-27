export interface ITransaction {
    id: string;
    amount: number;
    fee: number;
    netAmount: number;
    type: string;
    timestamp: Date;
    accountId: string;
}

export interface ITransactionRequest {
    amount: number;
    type: string;
    accountNumber: string;
}