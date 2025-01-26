import { Component, inject, OnInit } from '@angular/core';
import { IDish } from '../../interfaces/dish.interface';
import { DishService } from '../../services/dish.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dish-get-all',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './dish-get-all.component.html',
  styleUrl: './dish-get-all.component.scss'
})
export class DishGetAllComponent {
  dishes: IDish[] = [];

  private dishService = inject(DishService);

  ngOnInit() {
    this.getAllDishes();
  }

  getAllDishes() {
    this.dishService.getAll().subscribe({
      next: (lista) => {
        this.dishes = lista;
      },
      error: (err) => {
        console.error('Error al obtener platos:', err);
      },
    });
  }
}
