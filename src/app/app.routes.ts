import { Routes } from '@angular/router';
import { LayoutComponent } from './components/template/layout/layout.component';
import { DishComponent } from './components/entities/dish/dish.component';
import { MenuComponent } from './components/entities/menu/menu.component';
import { ClientComponent } from './components/entities/client/client.component';
import { OrderComponent } from './components/entities/order/order.component';
import { RegisterClientComponent } from './components/entities/client/register-client/register-client.component';
import { UpdateClientComponent } from './components/entities/client/update-client/update-client.component';
import { RegisterDishComponent } from './components/entities/dish/register-dish/register-dish.component';
import { UpdateDishComponent } from './components/entities/dish/update-dish/update-dish.component';
import { RegisterMenuComponent } from './components/entities/menu/register-menu/register-menu.component';
import { UpdateMenuComponent } from './components/entities/menu/update-menu/update-menu.component';
import { RegisterOrderComponent } from './components/entities/order/register-order/register-order.component';
import { UpdateOrderComponent } from './components/entities/order/update-order/update-order.component';

export const routes: Routes = [
    {
        path: 'admin', 
        component: LayoutComponent,
        children: [
            {
                path: 'platos', 
                component: DishComponent,
                children: [
                    {path: 'registro', component: RegisterDishComponent},
                    {path: 'actualizacion/:id', component: UpdateDishComponent},
                ]
            },
            {
                path: 'menus', 
                component: MenuComponent,
                children: [
                    {path: 'registro', component: RegisterMenuComponent},
                    {path: 'actualizacion/:id', component: UpdateMenuComponent},
                ]
            },
            {
                path: 'clientes', 
                component: ClientComponent,
                children: [
                    {path: 'registro', component: RegisterClientComponent},
                    {path: 'actualizacion/:id', component: UpdateClientComponent},
                ]
            },
            {
                path: 'pedidos', 
                component: OrderComponent,
                children: [
                    {path: 'registro', component: RegisterOrderComponent},
                    {path: 'actualizacion/:id', component: UpdateOrderComponent},
                ]
            }
        ]
    }
];
