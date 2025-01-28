import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BottonEditComponent } from '../../bottons/botton-edit/botton-edit.component';
import { BottonDeleteComponent } from '../../bottons/botton-delete/botton-delete.component';
import { RestaurantService } from '../../../services/restaurant.service';
import { IRestaurant } from '../../../inferfaces/restaurant.interface';
import { IDish } from '../../../inferfaces/add-menu.interface';
import { DishService } from '../../../services/dish.service';
import { BottonAddComponent } from '../../bottons/botton-add/botton-add.component';

@Component({
  selector: 'app-get-menu',
  imports: [BottonEditComponent, BottonDeleteComponent, BottonAddComponent],
  templateUrl: './get-menu.component.html',
  styleUrl: './get-menu.component.scss',
})
export class GetMenuComponent {
  private restaurantService = inject(RestaurantService);
  private dishService = inject(DishService);

  @Output() addDishEvent = new EventEmitter<void>();
  @Output() editDishEvent = new EventEmitter<IDish>();
  @Input() dishes: IDish[] = [];
  infoRestaurant: IRestaurant | null = null;
  menuDescription: string = '';
  restaurantId: number = 1;

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
  addDish() {
    this.addDishEvent.emit();
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
