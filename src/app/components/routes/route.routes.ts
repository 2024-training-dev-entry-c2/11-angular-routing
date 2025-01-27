import { Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SectionClientsContentComponent } from '../section-clients-content/section-clients-content.component';
import { SectionDishesContentComponent } from '../section-dishes-content/section-dishes-content.component';
import { SectionOrdersContentComponent } from '../section-orders-content/section-orders-content.component';
import { SectionMenusContentComponent } from '../section-menus-content/section-menus-content.component';


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
        component: SectionClientsContentComponent,
     
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
        component: SectionDishesContentComponent,
     
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
        component: SectionOrdersContentComponent,
     
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
        component: SectionMenusContentComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  
  
];