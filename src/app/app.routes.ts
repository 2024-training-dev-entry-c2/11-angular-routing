import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ClientComponent } from './components/client/client.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { DishesComponent } from './components/dishes/dishes.component';

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
        ]
    },
];
