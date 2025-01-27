export interface ICreateCustomerRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ICustomerResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  orderIds: number[];
}
