import { IDishResponse } from '../../dish/interfaces/dish';

export interface ICreateMenuRequest {
  name: string;
  description: string;
  dishIds: number[];
}

export interface IMenuResponse {
  nemuId: number;
  name: string;
  description: string;
  dishes: IDishResponse[];
}
