export interface IDish {
  id: number,
  name: string;
  price: number;
  popular: boolean;
  menuRestaurantId?: number;
}
export interface IAddMenuRequest {
  description: string;
  restaurantId: number;
  dishes: IDish[];
}
export interface IAddMenuResponse {
    id: number,
    description: string,
    dishes: [
      {
        id: number,
        name: string,
        price: number,
        popular: boolean
      }
    ]

}
