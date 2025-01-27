import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BottonEditComponent } from '../botton-edit/botton-edit.component';
import { BottonDeleteComponent } from '../botton-delete/botton-delete.component';
import { RestaurantService } from '../../services/restaurant.service';
import { IRestaurant } from '../../inferfaces/restaurant.interface';
import { IDish } from '../../inferfaces/add-menu.interface';
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-get-menu',
  imports: [BottonEditComponent, BottonDeleteComponent],
  templateUrl: './get-menu.component.html',
  styleUrl: './get-menu.component.scss',
})
export class GetMenuComponent {
  private restaurantService = inject(RestaurantService);
  private dishService = inject(DishService);
  @Output() editDishEvent = new EventEmitter<IDish>();
  infoRestaurant: IRestaurant | null = null;
  dishes: IDish[] = [];
  menuDescription: string = '';
  restaurantId: number = 0;

  ngOnInit() {
    this.restaurantService.execute().subscribe({
      next: (data: IRestaurant) => {
        this.infoRestaurant = data;
        this.dishes = this.infoRestaurant.menuRestaurant.dishes;
        this.menuDescription = this.infoRestaurant.menuRestaurant.description;
        this.restaurantId = this.infoRestaurant.id;
        console.log(this.infoRestaurant);
      },
      error: (error) => {
        console.error('Error al obtener la informacion', error);
      },
    });
  }
  editDish(dish: IDish) {
    this.editDishEvent.emit(dish);
  }

  deleteDish(id: number): void {
    this.dishService.deleteDishById(id).subscribe({
      next: () => {
        this.dishes = this.dishes.filter((dish) => dish.id !== id);
      },
      error: (error: any) => {
        console.error('Error al eliminar el plato:', error);
      },
    });
  }
}
