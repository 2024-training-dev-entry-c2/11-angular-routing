import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-aside',
  imports: [ItemComponent ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  public items = [
    {
      link: 'menus',
      icon: 'menu',
      title: 'Menus'
    },
    {
      link: 'dishes',
      icon: 'dish',
      title: 'Platos'
    },
    {
      link: 'orders',
      icon: 'order',
      title: 'Pedidos'
    },
    {
      link: 'clients',
      icon: 'client',
      title: 'Clientes'
    },
    {
      link: 'about',
      icon: 'about',
      title: 'Nosotros'
    }
  ];
}
