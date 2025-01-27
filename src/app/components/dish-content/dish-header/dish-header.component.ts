import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDish } from '../../../interfaces/dish.interface';
import { DishService } from '../../../services/dish.service';
import { HeaderComponent } from "../../header/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-header',
  templateUrl: './dish-header.component.html',
  styleUrls: ['./dish-header.component.scss'],
  imports: [HeaderComponent, FormsModule, CommonModule],
})
export class DishHeaderComponent {
  dishName: string = '';
  price: number = 0;
  description: string = '';
  isPopular: boolean = false;

  @Input() menuId!: number;
  @Output() dishAdded = new EventEmitter<IDish>();

  constructor(private dishService: DishService) {}

  addDishToAPI() {
    // if (!this.dishName.trim() || this.price <= 0 || !this.description.trim()) {
    //   alert('Por favor, completa todos los campos del plato.');
    //   return;
    // }

    // const newDish: Omit<IDish, 'idDish'> = {
    //   dishName: this.dishName.trim(),
    //   price: this.price,
    //   description: this.description.trim(),
    //   isPopular: this.isPopular,
    // };

    // this.dishService.addDishToMenu(this.menuId, newDish).subscribe({
    //   next: (response) => {
    //     console.log('Plato agregado exitosamente:', response);
    //     this.dishAdded.emit(response);
    //     this.resetForm();
    //   },
    //   error: (error) => {
    //     console.error('Error al agregar el plato:', error);
    //   },
    // });
  }

  private resetForm(): void {
    this.dishName = '';
    this.price = 0;
    this.description = '';
    this.isPopular = false;
  }
}
