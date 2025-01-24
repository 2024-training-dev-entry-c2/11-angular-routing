import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OverviewComponent } from '../overview/overview.component';
import { MenuComponent } from '../menu/menu.component';
import { DishComponent } from '../dish/dish.component';
import { ClientComponent } from '../client/client.component';
import { OrderComponent } from '../order/order.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: SidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: '',
            component: OverviewComponent,
            outlet: 'body'
          }
        ]
      },
      {
        path: 'menus',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: SidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: '',
            component: MenuComponent,
            outlet: 'body'
          }
        ]
      },
      {
        path: 'dishes',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: SidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: '',
            component: DishComponent,
            outlet: 'body'
          }
        ]
      },
      {
        path: 'clients',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: SidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: '',
            component: ClientComponent,
            outlet: 'body'
          }
        ]
      },
      {
        path: 'orders',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: SidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: '',
            component: OrderComponent,
            outlet: 'body'
          }
        ]
      }
];
