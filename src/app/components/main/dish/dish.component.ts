import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DishCardComponent } from './dish-card/dish-card.component';
import { GetAllDishesService } from '../../../services/dish/get-all-dishes.service';
import { IDish } from '../../../interfaces/dishResponse';

@Component({
  selector: 'app-dish',
  imports: [RouterLink, DishCardComponent],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss',
})
export class DishComponent {
  dishes: IDish[] = [];

  constructor(private getAllDishesService: GetAllDishesService) {}

  ngOnInit(): void {
    this.getAllDishesService.execute().subscribe((data) => {
      this.dishes = data;
    });
  }
  trackByFn(index: number, dish: IDish): number {
    return dish.id;
  }
}
