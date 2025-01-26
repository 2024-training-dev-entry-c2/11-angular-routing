import { Routes } from '@angular/router';
import { LayoutComponent } from './components/templates/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dishes',
        pathMatch: 'full',
      },
      {
        path: 'dishes',
        loadChildren: () =>
          import('./pages/dishes/dishes.module').then((m) => m.DishesModule),
      },
    ],
  },
];
