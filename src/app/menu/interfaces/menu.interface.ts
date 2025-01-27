import { IDish } from "../../dish/interfaces/dish.interface";

export interface IMenu {
    id?: number;
    nombre: string;
    platos?: IDish[];
}

