import { Component } from '@angular/core';
import { ISidebarNav } from '../../../interfaces/sidebar/sidebar-nav';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public navItems: ISidebarNav[] = [
    {
      name: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      name: 'Clientes',
      icon: 'clients',
      path: '/clientes',
    },
    {
      name: 'Menu',
      icon: 'menu',
      path: '/menus',
    },
    {
      name: 'Platos',
      icon: 'plato',
      path: '/platos',
    },
    {
      name: 'Orders',
      icon: 'orders',
      path: '/ordenes',
    },
  ];
}
