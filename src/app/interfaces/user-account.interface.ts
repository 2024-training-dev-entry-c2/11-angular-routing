import { IUser } from './user.interface';
import { Account } from './account.interface';

export interface IUserAccount { 
    user: IUser;
    id: string;
    accountNumber: string;
    balance: number;
}

export interface IUserAccountImproved { 
    user: IUser;
    accounts: Account[];
}