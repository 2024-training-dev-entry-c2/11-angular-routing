export interface Imenu {
  id: number;
  name: string;
  description: string;
  dishIds: Dish[];
  restaurantId?: number;
  dishes?: Dish[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  popular: boolean;
}

export interface ImenuAlternativo {
  name: string;
  description: string;
  dishIds: Dish[];
  restaurantId?: number;
  dishes?: Dish[];
}
export interface ImenuAlternative {
  name: string;
  description: string;
  dishes: Dish[];
  restaurantId?: number;
}
