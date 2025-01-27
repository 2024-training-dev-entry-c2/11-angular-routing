import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDishResponse } from '../../../services/dish/interfaces/dish';
import { ListDishesService } from '../../../services/dish/list-dishes.service';

@Component({
  selector: 'app-dish-list',
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.scss',
})
export class DishListComponent implements OnInit {
  dishes: IDishResponse[] = [];

  constructor(private listDishesService: ListDishesService) {}

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.listDishesService.execute().subscribe({
      next: (response) => (this.dishes = response),
      error: (error) => console.error('Error al obtener los platos:', error),
    });
  }
}
