import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/main/main.component';
import { HomeComponent } from './pages/home/main/home.component';
import { ClientsComponent } from './pages/clients/clients/clients.component';
import { OrderComponent } from './pages/orders/order/order.component';
import { DishfoodComponent } from './pages/dish/dishfood/dishfood.component';
import { MenusComponent } from './pages/menus/menus/menus.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },{
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'clients',
                component: ClientsComponent
            },{
                path: 'orders',
                component: OrderComponent
            },{
                path:'menu',
                component: MenusComponent
            }
        ]
    },

];
