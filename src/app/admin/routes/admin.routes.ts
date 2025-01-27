import { Routes } from '@angular/router';
import { AdminComponent } from '../components/admin.component';
import { HomeComponent } from '../../home/components/home.component';
import { DishComponent } from '../../dish/components/dish.component';
import { CustomerComponent } from '../../customer/components/customer.component';
import { MenuComponent } from '../../menu/components/menu.component';
import { OrderComponent } from '../../order/components/order.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'customers',
    component: AdminComponent,
    children: [{ path: '', component: CustomerComponent }],
  },
  {
    path: 'menus',
    component: AdminComponent,
    children: [{ path: '', component: MenuComponent }],
  },
  {
    path: 'dishes',
    component: AdminComponent,
    children: [{ path: '', component: DishComponent }],
  },
  {
    path: 'orders',
    component: AdminComponent,
    children: [{ path: '', component: OrderComponent }],
  },
];
