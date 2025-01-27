import { Client } from "./client.interface";

export interface Order {
    id:number;
    client:Client;
    localDate:Date;
    dishfoodIds:number[];
    totalPrice:number;
    
}
export interface RequestOrder {
    clientId:number;
    localDate:Date;
    dishfoodIds:number[];
}