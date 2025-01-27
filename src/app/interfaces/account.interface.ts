export interface IAccountResponse{
    accountNumber: string,
    accountBalance: number,
    accountType: string,
    accountOwner: string,
    customerId: string
}

export interface IAccountRequest{
    accountNumber: string,
    accountBalance: number,
    accountType: string,
    accountOwner: string,
}