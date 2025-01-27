import { Component, inject } from '@angular/core';
import { DishFormComponent } from '../../molecules/dish-form/dish-form.component';
import { CreateDishService } from '../../../services/dish/create-dish.service';
import { IDish } from '../../../interfaces/dish-interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dish-manager.component.html',
  imports: [DishFormComponent, CurrencyPipe],
  styleUrls: ['./dish-manager.component.scss'],
})
export class DishManagerComponent {
  private createDishService = inject(CreateDishService);
  dishes: IDish[] = [];

  addDish(dish: IDish) {
    const newDish = { ...dish, price: Number(dish.price) };
    this.createDishService.execute(dish).subscribe({
      next: () => console.log('Plato creado con éxito'),
      // fetchDishes: () => this.fetchDishes(), TODO: Implementar RE-fetchDishes
      error: (error) => console.error('Error al crear el plato:', error),
    });
  }
}
