export interface IOrders{
    id: number;
    orderDate: string;
    totalPrice: number;
    clientId:number;
    dishes: Array<{}>;
}


export interface IOrdersResponse{
    data: Array<IOrders>;
    message: string;
    status: number;
}