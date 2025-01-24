import { IDish } from './dishResponse.interface';

export interface IMenu {
  id: number;
  name: string;
  dishes: IDish[];
}
