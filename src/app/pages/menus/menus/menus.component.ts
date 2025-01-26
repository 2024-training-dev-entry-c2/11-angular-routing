import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { MenusService } from '../../../services/menu/menus.service';
import { ButtonsComponent } from '../../../components/buttons/buttons.component';
import { DishService } from '../../../services/dish/dish.service';
import { DishfoodRequest, Menu } from '../../../interfaces/menu.interface';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
import { DishfoodComponent } from '../../dish/dishfood/dishfood.component';
import { UpdateDishComponent } from '../../dish/update-dish/update-dish.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-menus',
  imports: [
    TableComponent,
    ButtonsComponent,
    AddMenuComponent,
    UpdateMenuComponent,
    DishfoodComponent,
    UpdateDishComponent,
  ],
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
  public dish = inject(DishService);
  getMenus(): void {
    this.menus.getMenus()
    .pipe(
      map(data => {
        const getTabs = data.map(menu => ({ id: menu.id, name: menu.name }));
        const dishfoods = data.flatMap(menu => menu.dishfoods.map((dish: any) => ({ ...dish })));
        return { getTabs, dishfoods }; 
      }),
    )
    .subscribe({
      next: ({ getTabs, dishfoods }) => {
        this.getTabs.splice(0, this.getTabs.length, ...getTabs);
        this.dishfoods.splice(0, this.dishfoods.length, ...dishfoods);
      },
      error: (error) => {
        console.error('Error al obtener los menús:', error);
      }
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
  DishId: number = 0;
  DishData: DishfoodRequest | any;
  showModal = false;
  showModalMenu = false;
  showModalDish = false;
  showModalDishUpdate = false;

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
  openModalDishupdate($event: number, id: number) {
    this.dish.getDishId($event).subscribe({
      next: (data) => {
        this.DishData = data;
        this.showModalDishUpdate = true;
        this.DishId = $event;
        this.MenuId = id;
      },
      error: (error) => {
        console.log(error);
      },
    });    
  }
  closeModalDishupdate() {
    this.showModalDishUpdate = false;
    this.getMenus();
  }

}
