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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Lógica para manejar el menú
  addMenu(menu: IMenu) {
    console.log('Menú agregado:', menu);
    this.isModalOpen = false;  // Cierra el modal después de agregar el menú
  }
}
