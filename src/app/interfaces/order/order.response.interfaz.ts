import { IClientResponse } from "../client/client.response.interface";
import { IDishOrderResponse } from "../dish-order/dish-order.response.interface";

export interface IOrderResponse{
    id: number;
    client: IClientResponse;
    dishes: IDishOrderResponse[];
    date: Date;
    total: number;
}