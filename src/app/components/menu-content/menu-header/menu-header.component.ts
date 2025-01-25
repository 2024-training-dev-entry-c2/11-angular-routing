import { Component, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { MenuService } from '../../../services/menu.service';
import { IMenu } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  isModalOpen: boolean = false;
  constructor(private menuService: MenuService) {}


  openModal() {
    this.isModalOpen = true;
  }

  closeModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  addMenu(menu: IMenu) {
    console.log('Menú a enviar:', menu);
    this.menuService.addMenu(menu).subscribe({
      next: (response) => {
        console.log('Menú agregado correctamente:', response);
        this.isModalOpen = false; 
        alert('Menú agregado exitosamente.');
      },
      error: (err) => {
        console.error('Error al agregar el menú:', err);
        alert('Hubo un error al agregar el menú. Inténtalo de nuevo.');
      }
    });
  }
  
}
