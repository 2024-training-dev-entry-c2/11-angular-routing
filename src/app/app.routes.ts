import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdenComponent } from './components/orden/orden.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ClientComponent } from './components/client/client.component';
import { MenuComponent } from './components/menu/menu.component';


export const routes: Routes = [
  {
    path: '' ,
    redirectTo:'dashboard',
    pathMatch: 'full',

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path:'',
        component: MainContentComponent,
      },
      {
        path:'ordenes',
        component: OrdenComponent,
      },
      {
        path:'clientes',
        component: ClientComponent,
      },
      {
        path: 'menus',
        component: MenuComponent,

      },
    ],
  },
]

