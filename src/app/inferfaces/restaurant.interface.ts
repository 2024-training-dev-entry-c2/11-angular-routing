import {IAddMenuResponse} from './add-menu.interface';

export interface IRestaurant {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  openingHours: [number, number];
  closingHours: [number, number];
  menuRestaurant: IAddMenuResponse;
}
