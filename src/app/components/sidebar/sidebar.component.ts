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
  @Output() subMenuToggled = new EventEmitter<{
    id: number;
    isOpen: boolean;
  }>();
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
    {
      title: 'Platos',
      id: 4,
      link: 'platos',

    },
  ];


activeSubMenuId: number | null = null;

handleClick(item: { title: string; link: string; id: number }): void {
  console.log('Clicked:', item.title);
  const isOpen = this.activeSubMenuId === item.id;
  this.activeSubMenuId = isOpen ? null : item.id;
  this.subMenuToggled.emit({ id: item.id, isOpen: !isOpen });
}

handleClickSubmenu(subitem: { title: string; link: string }) {
  console.log('Click en submenu:', subitem);
}

}
