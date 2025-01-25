import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { MenusService } from '../../../services/menu/menus.service';
import { ButtonsComponent } from '../../../components/buttons/buttons.component';
import { DishService } from '../../../services/dish/dish.service';
import { Menu } from '../../../interfaces/menu.interface';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
import { DishfoodComponent } from '../../dish/dishfood/dishfood.component';

@Component({
  selector: 'app-menus',
  imports: [
    TableComponent,
    ButtonsComponent,
    AddMenuComponent,
    UpdateMenuComponent,
    DishfoodComponent,
  ],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  updateDish($event: number) {
    throw new Error('Method not implemented.');
  }
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
  public dish = inject(DishService);
  getMenus(): void {
    this.menus.getMenus().subscribe({
      next: (data) => {
        this.getTabs.splice(0, this.getTabs.length);
        this.dishfoods.splice(0, this.dishfoods.length);

        data.forEach((menu) => {
          this.getTabs.push({ id: menu.id, name: menu.name });

          menu.dishfoods.forEach((dish: any) => {
            this.dishfoods.push({
              ...dish,
              orderListSize: dish.orderList.length, // Agregar el tamaño de orderList
            });
          });
        }); 

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

  deleteMenu(id: number) {
    this.menus.deleteMenu(id).subscribe({
      next: (data) => {
        this.getMenus();
        alert('Menu deleted');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteDish(id: number) {
    console.log(id);
    this.dish.deleteDish(id).subscribe({
      next: (data) => {
        this.getMenuDishes(this.getTabs[this.activeTab].name);
        alert('Dish deleted');
        this.getMenus();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  //update Menu
  dataMenu: Menu | any;
  MenuId: number = 0;
  showModal = false;
  showModalMenu = false;
  showModalDish = false;

  getMenu(id: number) {
    this.menus.getMenuId(id).subscribe({
      next: (data) => {
        this.dataMenu = data;
        this.MenuId = id;
        this.getMenus();
        this.showModal = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  closeModal() {
    this.showModal = false;
    this.getMenus();
  }
  openModalMenu() {
    this.showModalMenu = true;
    console.log(this.showModalMenu);
  }
  closeModalMenu() {
    this.showModalMenu = false;
    this.getMenus();
  }
  openModalDish(id: number) {
    this.showModalDish = true;
    this.MenuId = id;
    console.log(this.MenuId);
  }
  closeModalDish() {
    this.showModalDish = false;
    this.getMenus();
  }


}
