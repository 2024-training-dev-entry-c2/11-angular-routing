import { Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AuthGuard } from './core/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { UserDashboardComponent } from './components/users/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'account/:accountNumber',
        component: AccountDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'users',
        component: UserDashboardComponent,
        canActivate: [AuthGuard],
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
