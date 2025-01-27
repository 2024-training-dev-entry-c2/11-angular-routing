import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../core/services/menu.service';
import { Dish, Imenu, ImenuAlternativo } from '../../interfaces/menu/menu';
import { FormCreateMenuComponent } from '../../shared/menu/form-create-menu/form-create-menu.component';
import { FormCreateUpdateComponent } from '../../shared/menu/form-create-update/form-create-update.component';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, FormCreateMenuComponent, FormCreateUpdateComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  public menus: Imenu[] = [];
  constructor(private menuService: MenuService) {}
  isModalForm = false;
  isModalUpdate = false;
  selectedMenuId!: number;
  openForm() {
    this.isModalForm = true;
  }
  closeModalForm() {
    this.isModalForm = false;
  }
  openModal(menuId: number) {
    this.selectedMenuId = menuId;
    this.isModalUpdate = true;
  }
  closeModal() {
    this.isModalUpdate = false;
    this.selectedMenuId = 0;
  }

  ngOnInit(): void {
    this.menuService.menuList.subscribe((menus) => (this.menus = menus));
    this.menuService.getMenus();
  }

  deleteMenu(id: number) {
    this.menuService.deleteMenu(id).subscribe();
  }

  createMenu(menu: ImenuAlternativo): void {
    this.menuService.createMenu(menu).subscribe();
  }

  editMenu(id: number, menu: ImenuAlternativo): void {
    this.menuService.updateMenu(id, menu).subscribe();
  }
}
