export interface IEditOrden {
  id?: number;
  priceTotal: number;
  statusOrder: string;
  clientId: number;
  items: IItemEdit[];
}

export interface IItemEdit {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  menuId: number;
  ordenId?: number;
}
