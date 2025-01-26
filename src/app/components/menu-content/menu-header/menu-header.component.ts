import { Component, EventEmitter, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { MenuService } from '../../../services/menu.service';
import { IMenu } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  menuName: string = '';
  dishes: string[] = [];

  constructor(
    private menuService: MenuService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, this.viewContainerRef, {
        title: 'Agregar Menu',
        buttonName: 'Agregar',
      })
      .subscribe(() => {
        this.addMenuToAPI();
      });
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
          console.log('Menu agregado exitosamente:', response);
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
