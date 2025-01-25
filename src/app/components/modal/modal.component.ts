import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMenu } from '../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() addMenu = new EventEmitter<IMenu>();

  menuName: string = '';
  dishes: string[] = [];

  constructor(private menuService: MenuService) {}

  close() {
    this.closeModal.emit(false);
  }

  addMenuToAPI() {
    if (this.menuName.trim()) {
      const newMenu = {
        idMenu: null, 
        menuName: this.menuName.trim(),
        dishes: this.dishes.map(dishName => ({
          idDish: null, 
          dishName: dishName.trim()
        }))
      };
  
      this.menuService.addMenu(newMenu).subscribe({
        next: response => {
          console.log('Menú agregado exitosamente:', response);
        },
        error: error => {
          console.error('Error al agregar el menú:', error);
        }
      });
  
      this.close(); 
    } else {
      alert('Por favor, ingresa un nombre para el menú.');
    }
  }

  addDish(dish: string) {
    if (dish && !this.dishes.includes(dish)) {
      this.dishes.push(dish);
    }
  }

  removeDish(dish: string) {
    this.dishes = this.dishes.filter(d => d !== dish);
  }
}
