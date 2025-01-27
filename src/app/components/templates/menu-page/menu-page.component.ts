import { Component, OnInit } from '@angular/core';
import { MenuForm } from '../../../interfaces/menu-interface';
import { IMenuResponse } from '../../../services/menu/interfaces/menu-interface';
import { ListMenusService } from '../../../services/menu/list-menus.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { HeadingComponent } from '../../atoms/heading/heading.component';
import { ModalComponent } from '../../atoms/modal/modal.component';
import { MenuListComponent } from '../../organisms/menu-list/menu-list.component';
import { MenuManagerComponent } from '../../organisms/menu-manager/menu-manager.component';

@Component({
  selector: 'app-menu-page',
  imports: [
    HeadingComponent,
    ButtonComponent,
    MenuListComponent,
    ModalComponent,
    MenuManagerComponent,
  ],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  constructor(private listMenusService: ListMenusService) {}
  menus: IMenuResponse[] = [];
  isModalOpen = false;

  ngOnInit(): void {
    this.fetchMenus();
  }

  fetchMenus(): void {
    this.listMenusService.execute().subscribe({
      next: (response) => (this.menus = response),
      error: (error) => console.error('Error al obtener los menús:', error),
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.fetchMenus();
  }

  onSubmitMenu(menu: MenuForm): void {
    this.closeModal();
  }

  onMenuCreated(): void {
    this.fetchMenus();
  }

  onMenuDeleted(): void {
    this.fetchMenus();
  }
}
