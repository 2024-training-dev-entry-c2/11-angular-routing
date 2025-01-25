import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { MenusService } from '../../../services/menu/menus.service';
import { ButtonsComponent } from '../../../components/buttons/buttons.component';

@Component({
  selector: 'app-menus',
  imports: [TableComponent, ButtonsComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  ngOnInit(): void {
    this.getMenus();
  }

  images = [
    'assets/icons/form-svgrepo-com.svg#icon-delete',
    'assets/icons/form-svgrepo-com.svg#icon-update',
  ];

  getTabs: { id: number; name: string }[] = [];
  dishfoods: any[] = [];

  activeTab = 0;

  selectTab(index: number): void {
    this.activeTab = index;
  }
  public menus = inject(MenusService);
  getMenus(): void {
    this.menus.getMenus().subscribe({
      next: (data) => {
        data.forEach((menu) => {
          this.getTabs.push({ id: menu.id, name: menu.name });
          menu.dishfoods.forEach((dish: any) => {
            this.dishfoods.push({
              ...dish,
              orderListSize: dish.orderList.length, // Agregar el tamaño de orderList
            });
          });
        });
        console.log(this.getTabs);
        console.log(this.dishfoods);
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getMenuDishes(menu: string): any[] {
    return this.dishfoods.filter((dish) => dish.menu === menu);
  }

  addDish() {
    throw new Error('Method not implemented.');
  }
  deleteMenu(id: number) {
    
  }
  updateMenu(id: number) {
    console.log(id);
  }
}
