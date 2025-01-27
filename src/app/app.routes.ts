import { Routes } from '@angular/router';
import { LayoutComponent } from './components/templates/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dishes',
        loadChildren: () =>
          import('./pages/dishes/dishes.module').then((m) => m.DishesModule),
      },
      {
        path: 'menus',
        loadChildren: () =>
          import('./pages/menus/menus.module').then((m) => m.MenusModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./pages/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
    ],
  },
];
