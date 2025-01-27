import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', loadChildren: () => import('./components/routes/route.routes').then((webRoutes) => webRoutes.routes) },
        ],
      },
      
];
