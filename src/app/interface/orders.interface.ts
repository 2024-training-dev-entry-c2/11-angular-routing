import { IDishes } from "./dishes.interface";

export interface IOrders{
    id: number;
    orderDate: string;
    totalPrice: number;
    clientId:number;
    clientName: string;
    clientEmail: string;
    dishes: Array<IDishes>;
}


export interface IOrdersResponse{
    data: Array<IOrders>;
    message: string;
    status: number;
}