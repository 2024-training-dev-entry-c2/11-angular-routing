import { IDishResponse } from "../dish/dish.response.interface";

export interface IMenuResponse{
    id: number;
    name: string;
    dishes: IDishResponse[];
}