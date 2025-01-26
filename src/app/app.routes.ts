import { Routes } from '@angular/router';
import { LayoutComponent } from './components/template/layout/layout.component';
import { DishComponent } from './components/entities/dish/dish.component';
import { MenuComponent } from './components/entities/menu/menu.component';
import { ClientComponent } from './components/entities/client/client.component';

export const routes: Routes = [
    {
        path: 'admin', 
        component: LayoutComponent,
        children: [
            {path: 'platos', component: DishComponent, outlet: 'main'},
            {path: 'menus', component: MenuComponent, outlet: 'main'},
            {path: 'clientes', component: ClientComponent, outlet: 'main'}
        ]
    },

];
