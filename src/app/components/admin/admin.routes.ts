import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../main/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
];
