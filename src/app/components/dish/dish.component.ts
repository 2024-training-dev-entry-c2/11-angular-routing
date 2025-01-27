import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { IDish } from '../../interfaces/dish.interface';
import { DishModalComponent } from '../dish-modal/dish-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
  imports: [DishModalComponent, CommonModule],
})
export class DishComponent implements OnInit {
  dishes: IDish[] = [];
  selectedDish: IDish | null = null;
  isModalOpen: boolean = false;

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  openModal(dish: IDish | null): void {
    this.selectedDish = dish;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDish = null;
  }

  saveDish(dish: IDish): void {
    if (dish.id === 0) {
      this.dishService.createDish(dish).subscribe((newDish) => {
        this.dishes.push(newDish);
        this.closeModal();
      });
    } else {
      this.dishService.updateDish(dish).subscribe((updatedDish) => {
        const index = this.dishes.findIndex((d) => d.id === updatedDish.id);
        if (index !== -1) {
          this.dishes[index] = updatedDish;
        }
        this.closeModal();
      });
    }
  }

  deleteDish(dishId: number): void {
    if (confirm('¿Estás seguro de eliminar este plato?')) {
      this.dishService.deleteDish(dishId).subscribe(() => {
        this.dishes = this.dishes.filter((d) => d.id !== dishId);
      });
    }
  }
}
