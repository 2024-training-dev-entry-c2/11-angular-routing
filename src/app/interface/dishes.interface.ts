export interface IDishes{
    id: number;
    name: string;
    price: number;
    menuId: number;
    dishType: string;
    totalOrdered: number;
}


export interface IDishesResponse{
    data: Array<IDishes>;
    message: string;
    status: number;
}