export interface Menu {//response
    id:number;
    name:string;
    dishfoods:DishfoodRequest[];

}

export interface RequestMenu {
    name:string;

}

export interface Dishfood{//reponse
    name:string;
    price:number;
    isPopular:boolean;
    menuId:number;
}
export interface DishfoodRequest{
    id:number;
    name:string;
    price:number;
    isPopular:boolean;
    menu:string;
    orderList:number[];
}