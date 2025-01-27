import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: 'dashboard',
        redirectTo: 'dashboard/clients',
        pathMatch: 'full',
    },
    { 
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () => import('./components/sidebar.routes').then(m => m.SIDEBAR_ROUTES),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
