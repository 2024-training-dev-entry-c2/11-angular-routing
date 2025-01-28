import { Component, inject, ViewChild } from '@angular/core';
import { GetMenuComponent } from '../get-menu/get-menu.component';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { DishService } from '../../../services/dish.service';
import { IDish } from '../../../inferfaces/add-menu.interface';
import { RestaurantService } from '../../../services/restaurant.service';
import { IRestaurant } from '../../../inferfaces/restaurant.interface';
import { ModalComponent } from "../../modal/modal.component";
import { BottonAddComponent } from '../../bottons/botton-add/botton-add.component';




@Component({
  selector: 'app-menu',
  imports: [GetMenuComponent, AddDishComponent, ModalComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private restaurantService = inject(RestaurantService);
  dishes: IDish[] = [];
  dishEdit: IDish | null = null;
  isModalVisible: boolean = false;
  @ViewChild(GetMenuComponent) getMenuComponent!: GetMenuComponent;

  addDish() {
    this.dishEdit = null;
    this.isModalVisible = true;
  }
  editDish(dish: IDish) {
    this.dishEdit = dish;
    this.isModalVisible = true;
  }

  updateDish(dish: IDish) {
    this.loadMenu();
    setTimeout(() => {
      this.isModalVisible = false;
    }, 2000);
  }

  loadMenu() {
    this.restaurantService.execute().subscribe({
      next: (data: IRestaurant) => {
        this.getMenuComponent.dishes = data.menuRestaurant.dishes;
      },
      error: (error) => {
        console.error('Error al obtener el menú', error);
      },
    });
  }
  closeModal() {
    this.isModalVisible = false;
  }
}
