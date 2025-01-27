import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DishService } from '../../core/services/dish.service';
import { Idish } from '../../interfaces/dish/dish';
import { CurrencyPipe } from '@angular/common';
import { ModalDishesComponent } from '../../shared/modal-dishes/modal-dishes.component';
import { FormCreateComponent } from '../../shared/dishes/form-create/form-create.component';

@Component({
  selector: 'app-dishes',
  imports: [
    MatIconModule,
    CurrencyPipe,
    ModalDishesComponent,
    FormCreateComponent,
  ],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss',
})
export class DishesComponent implements OnInit {
  public dishes: Idish[] = [];
  public idDish: number = 0;
  isModalOpen = false;
  isModalForm = false;

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.dishService.dishes.subscribe((dishes) => (this.dishes = dishes));
    this.dishService.getDishes();
  }

  openModal(id: number) {
    this.isModalOpen = true;
    this.idDish = id;
  }

  openForm() {
    this.isModalForm = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  closeModalForm() {
    this.isModalForm = false;
  }

  deleteDish(id: number) {
    this.dishService.deleteDish(id).subscribe();
  }

  createDish(dish: Idish): void {
    this.dishService.createDish(dish).subscribe();
  }

  editDish(id: number, dish: Idish): void {
    this.dishService.updateDish(id, dish).subscribe();
  }
}
