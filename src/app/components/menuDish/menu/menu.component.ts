import { Component, inject, ViewChild } from '@angular/core';
import { GetMenuComponent } from '../get-menu/get-menu.component';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { DishService } from '../../../services/dish.service';
import { IDish } from '../../../inferfaces/add-menu.interface';
import { RestaurantService } from '../../../services/restaurant.service';
import { IRestaurant } from '../../../inferfaces/restaurant.interface';




@Component({
  selector: 'app-menu',
  imports: [GetMenuComponent, AddDishComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private restaurantService = inject(RestaurantService);
  dishes: IDish[] = [];
  dishEdit: IDish | null = null;
  @ViewChild(GetMenuComponent) getMenuComponent!: GetMenuComponent;

  editDish(dish: IDish) {
    this.dishEdit = dish;
  }

  updateDish(dish: IDish) {
    this.loadMenu();
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
}
