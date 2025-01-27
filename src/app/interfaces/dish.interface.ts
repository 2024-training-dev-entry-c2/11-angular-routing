export interface IDish {
    idDish: number;
    dishName: string;
    price: number;
    description: string;
    isPopular: boolean;
}
  
export interface IDishResponse {
    token: string;
    message: string;
}