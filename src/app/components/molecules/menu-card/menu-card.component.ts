import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IMenuResponse } from '../../../services/menu/interfaces/menu-interface';
import { DeleteMenuService } from '../../../services/menu/delete-menu.service';
import { UpdateMenuService } from '../../../services/menu/update-menu.service';
import { DialogComponent } from '../../atoms/dialog/dialog.component';
import { MenuFormComponent } from '../../molecules/menu-form/menu-form.component';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../../atoms/modal/modal.component';
import { MenuForm } from '../../../interfaces/menu-interface';

@Component({
  selector: 'app-menu-card',
  imports: [
    ButtonComponent,
    DialogComponent,
    NgIf,
    ModalComponent,
    MenuFormComponent,
  ],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  @Input() menu!: IMenuResponse;
  @Output() menuDeleted = new EventEmitter<void>();
  @Output() menuUpdated = new EventEmitter<void>();
  isDeleteDialogOpen = false;
  isEditDialogOpen = false;
  deleteMenuService = inject(DeleteMenuService);
  updateMenuService = inject(UpdateMenuService);
  initialMenuValues?: MenuForm;

  openDeleteDialog() {
    this.isDeleteDialogOpen = true;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = false;
  }

  openEditDialog() {
    this.initialMenuValues = {
      name: this.menu.name,
      description: this.menu.description,
      dishIds: this.menu.dishes.map((dish) => dish.id),
    };
    this.isEditDialogOpen = true;
  }

  closeEditDialog() {
    this.isEditDialogOpen = false;
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

  onSubmitMenu(menu: MenuForm) {
    if (this.menu && this.menu.menuId) {
      this.updateMenuService
        .execute(this.menu.menuId, {
          name: menu.name,
          description: menu.description,
          dishIds: menu.dishIds,
        })
        .subscribe({
          next: () => {
            console.log('Menu actualizado con exito');
            this.closeEditDialog();
            this.menuUpdated.emit();
          },
          error: (error) => console.error('Error al actualizar el menu', error),
        });
    } else {
      console.error('Menu ID is undefined');
    }
  }
}