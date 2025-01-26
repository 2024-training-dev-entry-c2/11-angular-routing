import { Component, OnInit } from '@angular/core';
import { HeadingComponent } from '../../atoms/heading/heading.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MenuListComponent } from '../../organisms/menu-list/menu-list.component';
import { ListMenusService } from '../../../services/menu/list-menus.service';
import { IMenuResponse } from '../../../services/menu/interfaces/menu-interface';

@Component({
  selector: 'app-menu-page',
  imports: [HeadingComponent, ButtonComponent, MenuListComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent implements OnInit {
  constructor(private listMenusService: ListMenusService) {}
  menus: IMenuResponse[] = [];

  ngOnInit(): void {
    this.fetchMenus();
  }

  fetchMenus(): void {
    this.listMenusService.execute().subscribe({
      next: (response) => (this.menus = response),
      error: (error) => console.error('Error al obtener los menús:', error),
    });
  }
}
