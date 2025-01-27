import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ContentComponent } from '../content/content.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../../pages/menu/menu.component';
import { PlatosComponent } from '../../pages/platos/platos.component';
import { ClientComponent } from '../../pages/client/client.component';
import { PedidosComponent } from '../../pages/pedidos/pedidos.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: MenuComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer',
      },
    ],
  },
  {
    path: 'menu/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ContentComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: PlatosComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer',
      },
    ],
  },
  {
    path: 'client',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: ClientComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer',
      },
    ],
  },
  {
    path: 'platos',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: PlatosComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer',
      },
    ],
  },
  {
    path: 'pedidos',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header',
      },
      {
        path: '',
        component: PedidosComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer',
      },
    ],
  },
];
