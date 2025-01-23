import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../main/home/home.component';
import { CustomerComponent } from '../main/customer/customer.component';
import { CustomerFormComponent } from '../main/customer/customer-form/customer-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'customer/add', component: CustomerFormComponent },
    ],
  },
];
