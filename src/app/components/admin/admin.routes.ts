import { Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { ClientComponent } from "../../pages/client/client.component";
import { DishesComponent } from "../../pages/dishes/dishes.component";
import { HomeComponent } from "../../pages/home/home.component";
import { MenuComponent } from "../../pages/menu/menu.component";
import { OrderComponent } from "../../pages/order/order.component";

export const routes: Routes = [
    {
            path: '',
            component: LayoutComponent,
            children: [
                { path: 'home', component: HomeComponent },
                { path: 'client', component: ClientComponent },
                { path: 'menu', component: MenuComponent },
                { path: 'dishes', component: DishesComponent },
                { path: 'order', component: OrderComponent },
                { path: '', redirectTo: '/home', pathMatch: 'full' }
            ]
        },
    ];
    
