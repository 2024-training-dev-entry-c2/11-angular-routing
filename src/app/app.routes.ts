import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { authGuard } from './admin/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/routes/admin.routes').then((m) => m.routes),
  },
  { path: 'login', component: LoginComponent },
];
