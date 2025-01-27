import { Component, inject } from '@angular/core';
import { GetMenuComponent } from '../get-menu/get-menu.component';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { DishService } from '../../services/dish.service';
import { IDish } from '../../inferfaces/add-menu.interface';




@Component({
  selector: 'app-menu',
  imports: [GetMenuComponent, AddDishComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  dishEdit: IDish | null = null;

  editDish(dish: IDish) {
    this.dishEdit = dish;
  }
}
