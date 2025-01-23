import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OverviewComponent } from '../overview/overview.component';
import { HeaderComponent } from '../header/header.component';

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
            component: HeaderComponent,
            outlet: 'header'
          },
          {
            path: '',
            component: OverviewComponent,
            outlet: 'body'
          }
        ]
      }
];
