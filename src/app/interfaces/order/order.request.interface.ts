import { IDishOrderRequest } from "../dish-order/dish-order.request.interface";

export interface IOrderRequest{
    clientId: number;
    dishes: IDishOrderRequest[];
    date: Date;
}