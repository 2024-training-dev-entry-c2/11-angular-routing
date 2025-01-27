import { Routes } from '@angular/router';
import { CustomerFormComponent } from '@components/customer/components/customer-form/customer-form.component';
import { UpdateCustomerFormComponent } from '@components/customer/components/update-customer-form/update-customer-form.component';
import { SidebarComponent } from '@components/dashboard/components/sidebar/sidebar.component';
import { CreateDishesFormComponent } from '@components/dishes/components/create-dishes-form/create-dishes-form.component';
import { UpdateDishesFormComponent } from '@components/dishes/components/update-dishes-form/update-dishes-form.component';
import { CreateMenuFormComponent } from '@components/menu/components/create-menu-form/create-menu-form.component';
import { UpdateMenuFormComponent } from '@components/menu/components/update-menu-form/update-menu-form.component';
import { CreateOrdersFormComponent } from '@components/orders/components/create-orders-form/create-orders-form.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('@components/dashboard/dashboard.component').then(module => module.DashboardComponent),
    children: [
      {
        path: '',
        component: SidebarComponent,
        outlet: 'secondary',
      },
      {
        path: 'home',
        loadComponent: () => import('@components/dashboard/components/home/home.component').then(module => module.HomeComponent)
      },
      {
        path: 'customer',
        loadComponent: () => import('@components/customer/customer.component').then(module => module.CustomerComponent),
        children:[
          {
            path: 'view',
            loadComponent: () => import('@components/customer/components/view-customer/view-customer.component').then(module => module.ViewCustomerComponent)

          },
          {
            path: 'create',
            component: CustomerFormComponent
          },
          {
            path: 'update/:id',
            component: UpdateCustomerFormComponent
          },
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'dishes',
        loadComponent: () => import('@components/dishes/dishes.component').then(module => module.DishesComponent),
        children:[
          {
            path: 'view',
            loadComponent: () => import('@components/dishes/components/view-dishes/view-dishes.component').then(module => module.ViewDishesComponent)

          },
          {
            path: 'create/:menu',
            component: CreateDishesFormComponent
          },
          {
            path: 'update/:id',
            component: UpdateDishesFormComponent
          },
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'menu',
        loadComponent: () => import('@components/menu/menu.component').then(module => module.MenuComponent),
        children:[
          {
            path: 'view',
            loadComponent: () => import('@components/menu/components/view-menu/view-menu.component').then(module => module.ViewMenuComponent)

          },
          {
            path: 'create',
            component: CreateMenuFormComponent
          },
          {
            path: 'update/:id',
            component: UpdateMenuFormComponent
          },
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'orders',
        loadComponent: () => import('@components/orders/orders.component').then(module => module.OrdersComponent),
        children:[
          {
            path: 'view',
            loadComponent: () => import('@components/orders/components/view-orders/view-orders.component').then(module => module.ViewOrdersComponent)

          },
          {
            path: 'create',
            component: CreateOrdersFormComponent
          },
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          }
        ]
      },

      {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full',
      },
    ],
  },

  { path: '**',
    redirectTo: 'dashboard/home',
    pathMatch: 'full',
  },
];
