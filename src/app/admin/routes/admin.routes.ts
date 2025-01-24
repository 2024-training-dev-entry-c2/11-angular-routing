import { Routes } from '@angular/router';
import { AdminComponent } from '../components/admin.component';
import { HomeComponent } from '../../home/components/home.component';
import { DishComponent } from '../../dish/components/dish.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'dishes',
    component: AdminComponent,
    children: [{ path: '', component: DishComponent }],
  },
];
