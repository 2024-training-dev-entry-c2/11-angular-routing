export interface ICreateDishRequest {
    name: string;
    price: number;
    menuId: number;
}

export interface IDishResponse {
    id: string;
    name: string;
    price: number;
    menuId: number;
}
