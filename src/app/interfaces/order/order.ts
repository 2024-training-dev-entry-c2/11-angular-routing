import { Iclient } from "../client/client";
import { Idish } from "../dish/dish";

export interface Iorder {
  id: number;
  date: string;
  total: number;
  user?: Iclient;
  orderDetails?: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  quantity: number;
  orderReques?: string;
  dish?: Idish;
}
