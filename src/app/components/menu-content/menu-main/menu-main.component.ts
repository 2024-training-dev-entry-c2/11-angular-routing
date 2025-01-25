import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { IMenu } from '../../../interfaces/menu.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-main',
  imports: [RouterLink],
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss']
})
export class MenuMainComponent implements OnInit {
  menus: IMenu[] = []; 
  actions = [
    { label: 'Editar', link: '/edit', type: 'edit', icon: 'svg/edit.svg#edit' },
    { label: 'Eliminar', link: '/delete', type: 'delete', icon: 'svg/delete.svg#delete' }
  ];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (menus) => {
        this.menus = menus;
      },
      (error) => {
        console.error('Error loading menus', error);
      }
    );
  }

  getHeaders() {
    return [
      { label: 'Menu ID' },
      { label: 'Nombre del Menu' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return this.actions;
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe(
      () => {
        console.log('Menu deleted');
        this.loadMenus(); 
      },
      (error) => {
        console.error('Error deleting menu', error);
      }
    );
  }

  updateMenu(id: number, updatedMenu: IMenu): void {
    this.menuService.updateMenu(id, updatedMenu).subscribe(
      () => {
        console.log('Menu updated');
        this.loadMenus();
      },
      (error) => {
        console.error('Error updating menu', error);
      }
    );
  }
}
