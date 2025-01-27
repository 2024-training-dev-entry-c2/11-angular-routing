import { IDish } from "./dish.interface";

export interface IOrder {
    id: number;
    clientId: number;
    dishes: IDish[];
    total: number;
}