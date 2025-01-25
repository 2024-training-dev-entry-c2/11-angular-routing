export interface Imenu {
  id: number;
  name: string;
  description: string;
  dishes: Dish[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  popular: boolean;
}
