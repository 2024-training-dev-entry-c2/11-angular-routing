import { Routes } from '@angular/router';
<<<<<<< HEAD
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', loadChildren: () => import('./components/routes/route.routes').then((webRoutes) => webRoutes.routes) },
        ],
      },
      
=======

export const routes: Routes = [
  {
    path: 'jacobo',
    loadChildren: () => import('./components/admin/admin.routes').then((adminRoutes) => adminRoutes.routes)
  }
>>>>>>> f625066c92f7a71c66e9424319e85907be9b8338
];
