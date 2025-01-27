export interface IAuth {
  email: string;
  password: string;
  address: IAddress;
  tags: string[];
}

export interface IAddress {
  street: string;
  number: number;
  zipCode: number;
}

export interface IAuthenticationResponse {
  token: string;
  message: string;
}
