export interface ICreateOrden {
  priceTotal: number;
  statusOrder: string;
  clientId: number;
  items: IItemCreate[];
}

export interface IItemCreate {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  menuId: number;
  ordenId: number;
}
