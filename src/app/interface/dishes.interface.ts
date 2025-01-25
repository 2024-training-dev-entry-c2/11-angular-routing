export interface IDishes{
    id: number;
    name: string;
    description: string;
    dishes: Array<{}>;
}


export interface IDishesResponse{
    data: Array<IDishes>;
    message: string;
    status: number;
}