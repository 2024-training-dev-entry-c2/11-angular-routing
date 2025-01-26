import { IClientResponse } from "../client/client.response.interface";

export interface IOrderResponse{
    id: number;
    client: IClientResponse;
    name: string;
    LocalDate: Date;
    total: number;
}