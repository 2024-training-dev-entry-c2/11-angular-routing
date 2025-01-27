import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import(
        './layout/auth-layout/auth-container.component'
      ).then((m) => m.AuthContainerComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent)
  },
  { 
    path: '**', 
    redirectTo: 'auth'
  },
];
