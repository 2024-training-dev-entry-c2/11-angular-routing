import { Routes } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { OrderComponent } from "./order/order.component";
import { DishComponent } from "./dish/dish.component";
import { MenuComponent } from "./menu/menu.component";

export const SIDEBAR_ROUTES: Routes = [
    { path: 'clients', component: ClientComponent,},
    { path: 'orders', component: OrderComponent },
    { path: 'dishes', component: DishComponent },
    { path: 'menus', component: MenuComponent },
];