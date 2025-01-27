import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ContentComponent } from '../content/content.component';
import { adminGuard } from './admin.guard';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../../pages/menu/menu.component';
import { PlatosComponent } from '../../pages/platos/platos.component';

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
        component: MenuComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer'
      }
    ]
  },
  {
    path: 'menu/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ContentComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: PlatosComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer'
      }
    ]
  },
  {
    path: 'client',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MenuComponent,
      },
      {
        path: '',
        component: ContentComponent,
        outlet: 'footer'
      }
    ]
  },
];
