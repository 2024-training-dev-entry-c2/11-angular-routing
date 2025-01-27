export interface IOrderResponseDto {
    idOrder: number;
    totalAmount: number;
    orderItems: IOrderItemResponseDto[];
    clientName: string;
  }
  
  export interface IOrderItemResponseDto {
    idOrderItem: number;
    idDish: number;
    quantity: number;
  }
  