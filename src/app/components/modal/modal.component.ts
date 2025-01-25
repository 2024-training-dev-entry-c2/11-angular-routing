import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMenu } from '../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';

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

  close() {
    this.closeModal.emit(false); // Emitir false cuando se cierra el modal
  }

  addMenuToAPI() {
    if (this.menuName && this.dishes.length > 0) {
      const newMenu: IMenu = {
        idMenu: 0,  // Este valor será generado automáticamente desde la API o al agregar un menú.
        menuName: this.menuName,
        dishes: this.dishes.map(dish => ({ idDish: 0, dishName: dish })) // Crear los platos
      };
      this.addMenu.emit(newMenu);  // Emitir el menú hacia el componente padre
      this.close(); // Cerrar el modal
    } else {
      alert('Por favor ingresa un nombre de menú y al menos un plato.');
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
