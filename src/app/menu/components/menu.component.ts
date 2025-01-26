import { Component, inject, OnInit } from '@angular/core';
import { ListMenusService } from '../services/list-menus.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormMenuComponent } from './form-menu/form-menu.component';

import { IMenuResponse, IMenu } from '../interfaces/menu.interface';
import { UpdateMenuService } from '../services/update-menu.service';
import { DeleteCardComponent } from '../../delete-card/delete-card.component';

@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, FormMenuComponent, DeleteCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  showSaveMenu = false;
  showDeleteMenu = false;

  private listMenusService = inject(ListMenusService);
  private updateMenuService = inject(UpdateMenuService);

  menus: IMenuResponse[] = [];
  selectedMenu: IMenuResponse | null = null;
  selectedIdMenu!: number;

  ngOnInit(): void {
    this.listMenusService.execute().subscribe((menus) => {
      this.menus = menus;
    });
  }

  showCreateMenuModal(): void {
    this.showSaveMenu = true;
  }

  showDeleteMenuModal(idMenu: number): void {
    this.selectedIdMenu = idMenu;
    this.showDeleteMenu = true;
  }

  showUpdateMenuModal(selectedMenu: IMenuResponse): void {
    this.selectedMenu = selectedMenu;
    if (this.selectedMenu) {
      this.showSaveMenu = true;
    }
  }

  closeCreateMenuModal(): void {
    this.showSaveMenu = false;
  }

  closeDeleteMenuModal(): void {
    this.showDeleteMenu = false;
  }

  addMenu(newMenu: IMenuResponse): void {
    this.menus = [...this.menus, newMenu];
  }

  replaceMenu(updatedMenu: IMenuResponse): void {
    const index = this.menus.findIndex((c) => c.id === updatedMenu.id);
    if (index !== -1) {
      this.menus[index] = updatedMenu;
    }
    this.selectedMenu = null;
  }

  clearSelectedMenu(): void {
    this.selectedMenu = null;
  }

  deleteMenu(idMenu: number): void {
    const menu = this.menus.find((m) => m.id === idMenu);
    if (menu) {
      const deletedMenu: IMenu = {
        menuName: menu.menuName,
        description: menu.description,
        active: false,
      };
      this.updateMenuService.execute(idMenu, deletedMenu).subscribe(() => {
        this.menus = this.menus.filter((c) => c.id !== idMenu);
        this.showDeleteMenu = false;
      });
    }
  }
}
