import { Component, inject, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/menu.interface';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-menu-get-all',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './menu-get-all.component.html',
  styleUrl: './menu-get-all.component.scss'
})
export class MenuGetAllComponent implements OnInit {
  menus: IMenu[] = [];

  private menuService = inject(MenuService);

  ngOnInit() {
    this.getAllMenus();
  }

  getAllMenus() {
    this.menuService.getAll().subscribe({
      next: (lista) => {
        this.menus = lista;
      },
      error: (err) => {
        console.error('Error al obtener menús:', err);
      },
    });
  }
}
