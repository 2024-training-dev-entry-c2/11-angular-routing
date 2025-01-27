import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { adminGuard } from './admin.guard';
import { AsideComponent } from '../aside/aside.component';
import { MenuComponent } from '../models/menu/menu.component';
import { DishComponent } from '../models/dish/dish.component';
import { ClientComponent } from '../models/client/client.component';
import { ClientFormComponent } from '../models/client/client-form/client-form.component';
import { MenuFormComponent } from '../models/menu/menu-form/menu-form.component';
import { DishFormComponent } from '../models/dish/dish-form/dish-form.component';
import { OrderComponent } from '../models/order/order/order.component';
import { OrderFormComponent } from '../models/order/order-form/order-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'menus',
        component: MenuComponent,
      },
      {
        path: 'dish',
        component: DishComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'edit-client/:id',
        component: ClientFormComponent,
      },
      {
        path: 'edit-menu/:id',
        component: MenuFormComponent,
      },
      {
        path: 'edit-dish/:id',
        component: DishFormComponent,
      },
      {
        path: 'edit-order/:id',
        component: OrderFormComponent,
      },
      {
        path: 'add-client',
        component: ClientFormComponent,
      },
      {
        path: 'add-menu',
        component: MenuFormComponent,
      },
      {
        path: 'add-dish',
        component: DishFormComponent,
      },
      {
        path: 'add-order',
        component: OrderFormComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LayoutComponent,
    canActivate: [adminGuard],
    data: { isLogged: true },
    children: [
      {
        path: '',
        component: AsideComponent,
        outlet: 'left-side',
        data: { isBrota: true }
      },
      {
        path: '',
        component: LoginComponent,
        data: { isCurrent: true }
      },
    ]
  }
];
