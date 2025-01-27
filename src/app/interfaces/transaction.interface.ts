export interface TransactionResponse {
  id: string;
  fee: number;
  netAmount: number;
  type: string;
  timestamp: string;
  accountId: string;
  balance: number;
}

export interface TransactionRequest {
  amount: string;
  type: string;
  accountNumber: string;
}
