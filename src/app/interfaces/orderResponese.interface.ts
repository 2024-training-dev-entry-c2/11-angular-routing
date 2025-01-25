import { IDish } from './dishResponse.interface';

export interface IOrderResponse {
  id: number;
  reservationId: number;
  dishes: IDish[];
  status: string;
  totalPrice: number;
}
