import { IDishes } from "./dishes.interface";

export interface IMenu{
    id: number;
    name: string;
    description: string;
    dishes: Array<IDishes>;
}


export interface IMenuResponse{
    data: Array<IMenu>;
    message: string;
    status: number;
}