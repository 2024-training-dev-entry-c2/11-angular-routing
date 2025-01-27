import { IUser } from "./user.interface";
import { ITransaction } from "./transaction.interface";

export interface Account {
    id: string;
    accountNumber: string;
    balance: number;
    userId: string;
}

export interface IEnriquecedAccount{
    id: string;
    accountNumber: string;
    balance: number;
    user: IUser;
    transactons: ITransaction[];
}