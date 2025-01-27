import { UserResponse } from './user.interface';

export interface AccountResponse {
  id: string;
  balance: number;
  accountNumber: string;
  user: UserResponse;
}

export interface AccountRequest {
  userId: string;
}
