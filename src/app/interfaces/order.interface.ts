import { IDish } from "./dish.interface";


export interface IOrders {
  id: number,
  customer: string,
  dishes: IDish[],
  quantity: number,
  total: number,
  createdAt: string,
}
