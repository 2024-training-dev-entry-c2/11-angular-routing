import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IMenuResponse } from '../../../services/menu/interfaces/menu-interface';
import { DeleteMenuService } from '../../../services/menu/delete-menu.service';
import { DialogComponent } from '../../atoms/dialog/dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu-card',
  imports: [ButtonComponent, DialogComponent, NgIf],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  @Input() menu!: IMenuResponse;
  @Output() menuDeleted = new EventEmitter<void>();
  isDeleteDialogOpen = false;
  deleteMenuService = inject(DeleteMenuService);

  openDeleteDialog() {
    this.isDeleteDialogOpen = true;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = false;
  }

  confirmDelete() {
    if (this.menu && this.menu.menuId) {
      this.deleteMenuService.execute(this.menu.menuId).subscribe({
        next: () => {
          console.log('Menu eliminado con exito');
          this.closeDeleteDialog();
          this.menuDeleted.emit();
        },
        error: (error) => console.error('Error al eliminar el menu', error),
      });
    } else {
      console.error('Menu ID is undefined');
    }
  }
}