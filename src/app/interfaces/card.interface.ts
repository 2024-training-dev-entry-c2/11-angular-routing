export interface  ICardResponse {
    customerId?: string;
    cardName: string;
    cardNumber: string;
    cardType: "DEBT" | "CREDIT";
    cardStatus: "active" | "inactive";
    cardExpiryDate: string;
    cardLimit: number;
    cardHolderName: string;
  }

  export interface  ICardRequest {
    cardName: string;
    cardNumber: string;
    cardType: "DEBT" | "CREDIT";
    cardStatus: "active" | "inactive";
    cardExpiryDate: string;
    cardLimit: number;
    cardHolderName: string;
    account?: {
      accountNumber:string
    };
  }
