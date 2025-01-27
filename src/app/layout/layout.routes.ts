import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ClientsComponent } from '../pages/clients/clients.component';
import { OrdersComponent } from '../pages/orders/orders.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { DishesComponent } from '../pages/dishes/dishes.component';

export const routesLayout: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'clientes',
    component: ClientsComponent,
  },
  {
    path: 'ordenes',
    component: OrdersComponent,
  },
  {
    path: 'menus',
    component: MenuComponent,
  },
  {
    path: 'platos',
    component: DishesComponent,
  },
];
