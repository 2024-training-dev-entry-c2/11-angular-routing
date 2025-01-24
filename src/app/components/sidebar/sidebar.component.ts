import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { title: 'ordenes', link: 'ordenes', id: 1 },
    { title: 'clientes',link: 'clientes', id: 2 },
    { title: 'menu', link: 'menus',id: 3 },
    { title: 'platos',link: 'platos', id: 4 },
  ];

  handleClick(item: { title: string; link: string, id: number }): void {
    console.log('Clicked:', item.title);
  }
}
