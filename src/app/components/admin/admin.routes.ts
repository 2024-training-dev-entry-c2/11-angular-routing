import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../main/home/home.component';
import { CustomerComponent } from '../main/customer/customer.component';
import { CustomerFormComponent } from '../main/customer/customer-form/customer-form.component';
import { DishComponent } from '../main/dish/dish.component';
import { MenuComponent } from '../main/menu/menu.component';
import { OrderComponent } from '../main/order/order.component';
import { ReservationComponent } from '../main/reservation/reservation.component';
import { DishFormComponent } from '../main/dish/dish-form/dish-form.component';
import { MenuFormComponent } from '../main/menu/menu-form/menu-form.component';
import { ReservationFormComponent } from '../main/reservation/reservation-form/reservation-form.component';
import { OrderFormComponent } from '../main/order/order-form/order-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'customer/add', component: CustomerFormComponent },
      { path: 'customer/edit/:id', component: CustomerFormComponent },
      { path: 'dish', component: DishComponent },
      { path: 'dish/add', component: DishFormComponent },
      { path: 'dish/edit/:id', component: DishFormComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'menu/add', component: MenuFormComponent },
      { path: 'menu/edit/:id', component: MenuFormComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'reservation/add', component: ReservationFormComponent },
      { path: 'reservation/edit/:id', component: ReservationFormComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order/add', component: OrderFormComponent },
      { path: 'order/edit/:id', component: OrderFormComponent },
    ],
  },
];
