import { IAccountResponse } from "./account.interface";

export interface ITransactionResponse {
    customerId: string;
    description: string;
    amount: number;
    transactionType: string;
    transactionFee: number;
    account: IAccountResponse;
    card: {};
    website?: string;
    marketName?: string;
    atmName?: string;
    operationType?: string;
    branchName?: string;
    accountReceiver?: IAccountResponse;
    receiverCustomerId?: string;
    accountNumberReceiver?:  string;
    timestamp: Date
}


export interface ITransactionRequest {
    customerId: string;
    description: string;
    amount: number;
    transactionType: string;
    transactionFee: number;
    account: {};
    card: {};
    website?: string;
    marketName?: string;
    atmName?: string;
    operationType?: string;
    branchName?: string;
    accountReceiver?:  {};
    receiverCustomerId?: string;
    accountNumberReceiver?:  string;
    accountNumber:  string;
}