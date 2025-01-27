import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RegisterComponent } from './views/register/register.component';
import { tokenGuard } from './guards/token.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  {
    path: '',
    component: HomeComponent,
    canActivate: [tokenGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
    ],
  },
];
