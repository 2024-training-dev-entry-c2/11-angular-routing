export interface ISendOrder {
    clientId: number;
    dishIds: number[];
  }
  
  export interface IResponseOrders {
    id: number; 
    client: { 
      id: number;
      name: string;
      lastName: string;
      email: string;
      clientType: string;
    };
    dishes: { 
      id: number;
      name: string;
      description: string;
      price: number;
      dishType: string;
      menuName: string;
    }[];
    totalPrice: number; 
    orderDate: string; 
  }
  