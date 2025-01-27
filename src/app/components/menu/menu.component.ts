import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { DishService } from '../../services/dish.service';
import { IMenu } from '../../interfaces/menu.interface';
import { IDish } from '../../interfaces/dish.interface';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [CommonModule, MenuModalComponent], // Importar MenuModalComponent
})
export class MenuComponent implements OnInit {
  menus: IMenu[] = [];
  dishes: IDish[] = [];
  selectedMenu: IMenu | null = null;
  isModalOpen: boolean = false;

  constructor(private menuService: MenuService, private dishService: DishService) {}

  ngOnInit(): void {
    this.loadMenus();
    this.loadDishes();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe((menus) => {
      this.menus = menus;
    });
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  openModal(menu: IMenu | null): void {
    this.selectedMenu = menu;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMenu = null;
  }

  saveMenu(menu: IMenu): void {
    if (menu.id === 0) {
      this.menuService.createMenu(menu).subscribe((newMenu) => {
        this.menus.push(newMenu);
        this.closeModal();
      });
    } else {
      this.menuService.updateMenu(menu).subscribe((updatedMenu) => {
        const index = this.menus.findIndex((m) => m.id === updatedMenu.id);
        if (index !== -1) {
          this.menus[index] = updatedMenu;
        }
        this.closeModal();
      });
    }
  }

  deleteMenu(menuId: number): void {
    if (confirm('¿Estás seguro de eliminar este menú?')) {
      this.menuService.deleteMenu(menuId).subscribe(() => {
        this.menus = this.menus.filter((m) => m.id !== menuId);
      });
    }
  }
}
