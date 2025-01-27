import { Component, EventEmitter, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { IMenu } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  menuName: string = '';
  dishes: string[] = [];

  @Output() menuAdded = new EventEmitter<IMenu>();

  constructor(
    private menuService: MenuService,
  ) {}

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
          console.log('Menu agregado exitosamente:', response);
          this.menuAdded.emit(response);
        },
        error: error => {
          console.error('Error al agregar el menu:', error);
        }
      });

    } else {
      alert('Por favor, ingresa un nombre para el menu.');
    }
  }
}
