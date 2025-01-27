export interface IOrder {
  id: number;
  clientId: number;
  dishIds: number[];
  date: string;
  totalCost: number;
}
