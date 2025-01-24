import { Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MainSectionClientsComponent } from '../main-section-clients/main-section-clients.component';
import { MainSectionDishesComponent } from '../main-section-dishes/main-section-dishes.component';
import { MainSectionOrdersComponent } from '../main-section-orders/main-section-orders.component';
import { MainSectionMenusComponent } from '../main-section-menus/main-section-menus.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MainComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  {
    path: 'clients',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MainSectionClientsComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  {
    path: 'dishes',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MainSectionDishesComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  {
    path: 'orders',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MainSectionOrdersComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  {
    path: 'menus',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MainSectionMenusComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  
  
];