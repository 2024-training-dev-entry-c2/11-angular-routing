import { IDish } from './dish.interface';

export interface IMenu {
  id: number;
  name: string;
  description: string;
  dishes: IDish[];
}
