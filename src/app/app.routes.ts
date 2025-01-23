import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/main/main.component';
import { HomeComponent } from './pages/home/main/home.component';
import { ClientsComponent } from './pages/clients/clients/clients.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },{
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'clients',
                component: ClientsComponent
            }
        ]
    },

];
