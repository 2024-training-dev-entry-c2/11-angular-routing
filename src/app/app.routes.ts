import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdenComponent } from './components/orden/orden.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ClientComponent } from './components/client/client.component';
import { MenuComponent } from './components/menu/menu.component';
import { DishComponent } from './components/dish/dish.component';

export const routes: Routes = [
  {
    path: '' ,
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path:'',
        component: MainContentComponent,
        outlet:"main"
      },
      {
        path:'ordenes',
        component: OrdenComponent,
        outlet:"main"
      },
      {
        path:'clientes',
        component: ClientComponent,
        outlet:"main"
      },
      {
        path:'menus',
        component: MenuComponent,
        outlet:"main"
      },
      {
        path:'platos',
        component: DishComponent,
        outlet:"main"
      }
    ]
  }
];

