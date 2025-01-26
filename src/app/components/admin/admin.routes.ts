import { Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { adminGuard } from './admin.guard';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: 'clientes', 
        loadChildren: () => import('../../client/client.module').then(m => m.ClientModule),
        outlet: "primary" 
      },
      { 
        path: 'menus', 
        loadChildren: () => import('../../menu/menu.module').then(m => m.MenuModule),
        outlet: "primary" 
      },
      { 
        path: 'platos', 
        loadChildren: () => import('../../dish/dish.module').then(m => m.DishModule),
        outlet: "primary" 
      }
    ]
  },
  
];
