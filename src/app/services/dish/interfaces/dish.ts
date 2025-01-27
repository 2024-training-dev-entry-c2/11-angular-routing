export interface ICreateDishRequest {
    name: string;
    price: number;
    menuId: number;
}

export interface IDishResponse {
    id: number;
    name: string;
    price: number;
    menuId: number;
}
