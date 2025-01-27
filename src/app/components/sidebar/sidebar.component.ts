import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMenuItem} from '../../inferfaces/menu.interface';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  menuItems: IMenuItem[] = [
    {
      title: 'Ordenes',
      id: 1,
      link: 'ordenes',
    },
    {
      title: 'Clientes',
      id: 2,
      link: 'clientes',
    },
    {
      title: 'Menú',
      id: 3,
      link: 'menus',
    },
  ];
}
