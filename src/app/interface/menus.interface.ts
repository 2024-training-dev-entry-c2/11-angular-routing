export interface IMenu{
    id: number;
    name: string;
    description: string;
    dishes: Array<{}>;
}


export interface IMenuResponse{
    data: Array<IMenu>;
    message: string;
    status: number;
}