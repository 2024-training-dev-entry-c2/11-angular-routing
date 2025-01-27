import { Iclient } from '../client/client';
import { Idish } from '../dish/dish';

export interface Iorder {
  id: number;
  date: string;
  total?: number;
  user?: Iuser;
  orderDetails?: OrderDetail[];
}

export interface OrderDetail {
  id?: number;
  quantity: number;
  orderReques?: string;
  dish?: Iplato;
}

export interface Iplato {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  isPopular?: boolean;
}

export interface Iuser {
  id: number;
  name?: string;
  email?: string;
  phone?: number;
  address?: string;
  isFrequent?: boolean;
  fechaCreacion?: string;
}

export interface Iorders {
  id?: number;
  date: string;
  total?: number;
  user?: Iuser;
  orderDetails?: OrderDetail[];
}
