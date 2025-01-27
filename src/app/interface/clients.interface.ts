export interface IClients{
    id: number;
    name: string;
    email: string;
    userType:string;
    totalOrders:number;
    orders: Array<{}>;
}


export interface IClientsResponse{
    data: Array<IClients>;
    message: string;
    status: number;
}